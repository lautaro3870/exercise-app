import { useEffect, useState } from 'react';
import { Exercise, Sets } from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

export function ExercisesHooks(tab: number) {
  const [exercises, setExercices] = useState<Exercise[]>([]);
  const [name, setName] = useState('');
  const [weigth, setWeigth] = useState('');
  const [edition, setEdition] = useState<boolean>(false);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [exerciseDownload, setExerciseDownload] = useState<any[]>([]);

  useEffect(() => {
    const exerciseFromLocalStorage = JSON.parse(
      window.localStorage.getItem(`exercises${tab}`) || '[]'
    );
    const updatedExercises = exerciseFromLocalStorage.map(
      (exercise: Exercise) => {
        const reorderedSets = [...exercise.sets].reverse();

        return {
          ...exercise,
          sets: reorderedSets.map((set: Sets, index: number) => ({
            ...set,
            index: index + 1,
          })),
        };
      }
    );
    setExercices(updatedExercises);
  }, [tab]);

  useEffect(() => {
    const exerciseDownloadTemp = exercises.map((exercise: Exercise) => {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const transformedObject: any = {
        Ejercicio: exercise.name,
        Peso: exercise.weigth + ' Kg',
      };

      exercise.sets.forEach((set: Sets, index: number) => {
        const reverseIndex = exercise.sets.length - index;
        transformedObject[
          `Set ${reverseIndex}`
        ] = `${set.repetitions.replaceAll('-', 'x')}`;
      });

      return transformedObject;
    });
    setExerciseDownload(exerciseDownloadTemp);
  }, [exercises]);

  const getFileName = (tab: number) => {
    switch (tab) {
      case 0:
        return 'exercise-push.csv';
      case 1:
        return 'exercise-leg.csv';
      case 2:
        return 'exercise-pull.csv';
      case 3:
        return 'exercise-arms.csv';
      case 4:
        return 'exercise-p+e.csv';
    }
  };

  const setLocalStorage = (tab: number, exercises: Exercise[]) => {
    localStorage.setItem(`exercises${tab}`, JSON.stringify(exercises));
  };

  const addNewExercise = () => {
    const nameInput = document.querySelector('#name') as HTMLInputElement;
    const weigthInput = document.querySelector('#weigth') as HTMLInputElement;
    const index = 0;
    const newExerciseObject: Exercise = {
      id: uuidv4(),
      tab: tab,
      name: nameInput?.value || '',
      weigth: weigthInput?.value || '',
      sets: [
        {
          id: uuidv4(),
          repetitions: '',
          index: index + 1,
        },
      ],
    };
    const newExercisesList = exercises.concat(newExerciseObject);
    setExercices(newExercisesList);
    setLocalStorage(tab, newExercisesList);
    const nameElement = document.querySelector('#name') as HTMLInputElement;
    const weigthElement = document.querySelector('#weigth') as HTMLInputElement;
    if (nameElement && weigthElement) {
      nameElement.value = '';
      weigthElement.value = '';
      setName('');
      setWeigth('');
    }
  };

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    idExercise: string,
    idSet: string
  ) => {
    const newExercise = exercises.map((exerciseMap: Exercise) => {
      if (exerciseMap.id === idExercise) {
        const newSet = exerciseMap.sets.map((set: Sets) => {
          if (set.id === idSet) {
            return {
              ...set,
              repetitions: event.target.value,
            };
          }
          return set;
        });
        return {
          ...exerciseMap,
          sets: newSet,
        };
      }
      return exerciseMap;
    });
    setExercices(newExercise);
    setLocalStorage(tab, newExercise);
  };

  const handlerDeleteSet = (idExercise: string, idSet: string) => {
    const newExercise = exercises
      .map((exerciseMap: Exercise) => {
        if (exerciseMap.id === idExercise) {
          const newSets = exerciseMap.sets.filter(
            (set: Sets) => set.id !== idSet
          );
          if (newSets.length === 0) {
            return undefined;
          } else {
            return {
              ...exerciseMap,
              sets: newSets,
            };
          }
        }
        return exerciseMap;
      })
      .filter(Boolean) as Exercise[];
    setExercices(newExercise);
    setLocalStorage(tab, newExercise);
  };

  const addSet = (idExercise: string) => {
    const newExercise = exercises.map((exerciseMap: Exercise) => {
      if (exerciseMap.id === idExercise) {
        const newSet: Sets = {
          id: uuidv4(),
          repetitions: '',
          index: exerciseMap.sets.length + 1,
        };
        exerciseMap.sets.unshift(newSet);
      }
      return exerciseMap;
    });
    setExercices(newExercise);
    localStorage.setItem('exercises', JSON.stringify(newExercise));
  };

  const openModal = () => {
    Swal.fire({
      title: 'Eliminar',
      showDenyButton: true,
      denyButtonText: `Eliminar`,
      showConfirmButton: false,
      width: 180,
    }).then((result) => {
      if (result.isDenied) {
        removeAllExercises();
      }
    });
  };

  const removeAllExercises = () => {
    setExercices([]);
    setLocalStorage(tab, []);
  };

  const updateNameAndWeigth = (
    newValue: string,
    typeInput: 'name' | 'weigth',
    idExercise: string
  ) => {
    if (typeInput === 'name') {
      setName(newValue);
    } else {
      setWeigth(newValue);
    }

    const updatedExercise = exercises.map((exercise: Exercise) => {
      return exercise.id === idExercise
        ? { ...exercise, [typeInput]: newValue }
        : exercise;
    });
    setExercices(updatedExercise);
    setLocalStorage(tab, updatedExercise);
  };

  return {
    addNewExercise,
    addSet,
    exercises,
    name,
    handleChangeInput,
    handlerDeleteSet,
    weigth,
    openModal,
    setEdition,
    edition,
    updateNameAndWeigth,
    setName,
    setWeigth,
    exerciseDownload,
    getFileName,
  };
}
