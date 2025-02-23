import { useEffect, useRef, useState } from "react";
import { Exercise, Sets } from "../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

export function ExercisesHooks(tab: number) {
  const [exercises, setExercices] = useState<Exercise[]>([]);
  const name = useRef<HTMLInputElement>(null);
  const weigth = useRef<HTMLInputElement>(null);
  const [edition, setEdition] = useState<boolean>(false);

  useEffect(() => {
    const exerciseFromLocalStorage = JSON.parse(
      window.localStorage.getItem(`exercises${tab}`) || "[]"
    );
    setExercices(exerciseFromLocalStorage);
  }, [tab]);

  const setLocalStorage = (tab: number, exercises: Exercise[]) => {
    localStorage.setItem(`exercises${tab}`, JSON.stringify(exercises));
  };

  const addNewExercise = () => {
    const nameInput = document.querySelector("#name") as HTMLInputElement;
    const weigthInput = document.querySelector("#weigth") as HTMLInputElement;

    const newExerciseObject: Exercise = {
      id: uuidv4(),
      tab: tab,
      name: nameInput?.value || "",
      weigth: weigthInput?.value || "",
      sets: [
        {
          id: uuidv4(),
          repetitions: "",
        },
      ],
    };
    const newExercisesList = exercises.concat(newExerciseObject);
    setExercices(newExercisesList);
    setLocalStorage(tab, newExercisesList);
    if (name.current && weigth.current) {
      name.current.value = "";
      weigth.current.value = "";
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
          repetitions: "",
        };
        exerciseMap.sets.unshift(newSet);
      }
      return exerciseMap;
    });
    setExercices(newExercise);
    localStorage.setItem("exercises", JSON.stringify(newExercise));
  };

  const openModal = () => {
    Swal.fire({
      title: "Eliminar",
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
    typeInput: "name" | "weigth",
    idExercise: string
  ) => {
    const ref = typeInput === "name" ? name : weigth;

    if (ref.current) {
      ref.current.value = newValue || "";
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
  };
}
