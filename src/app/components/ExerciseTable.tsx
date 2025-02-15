import { useState } from "react";
import { Button, Input, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { InputRenderer } from "@/app/components/InputRenderer";
import DeleteIcon from "@mui/icons-material/Delete";

type Sets = {
  id: number;
  repetitions: string;
  inputs: Inputs[];
};

export type Inputs = {
  id: number;
  input: JSX.Element | null;
};

type Exercise = {
  exercise: {
    id: number;
    name: string;
    weigth: string;
    sets: Sets[];
  };
};

const data: Exercise[] = [
  {
    exercise: {
      id: 1,
      name: "Pecho sentado",
      weigth: "70kg",
      sets: [
        {
          id: 1,
          repetitions: "10, 8, 9",
          inputs: [
            {
              id: 1,
              input: <Input defaultValue={"10, 8, 9"} sx={{ width: 80 }} />,
            },
          ],
        },
      ],
    },
  },
  {
    exercise: {
      id: 2,
      name: "Sentadill",
      weigth: "70kg",
      sets: [
        {
          id: 1,
          repetitions: "10, 10, 10",
          inputs: [
            {
              id: 1,
              input: <Input defaultValue={"10, 8, 9"} sx={{ width: 80 }} />,
            },
          ],
        },
      ],
    },
  },
];

export default function ExerciseTable() {
  const [exercises, setExercices] = useState<Exercise[]>(data);

  const handleChangeInput = (
    idInput: number,
    event: React.ChangeEvent<HTMLInputElement>,
    idExercise: number,
    idSet: number
  ) => {
    const newInputValue = event.target.value;
    const newExercise = exercises.map((exerciseMap: Exercise) => {
      if (exerciseMap.exercise.id === idExercise) {
        const newSets = exerciseMap.exercise.sets.map((set: Sets) => {
          if (set.id === idSet) {
            const newInputs = set.inputs.map((input: Inputs) => {
              if (input.id === idInput) {
                return {
                  ...input,
                  input: (
                    <div>
                      <Input defaultValue={newInputValue} sx={{ width: 80 }} />
                      <Button onClick={() => handleDeleteInput(input.id)}>
                        <DeleteIcon />
                      </Button>
                    </div>
                  ),
                };
              }
              return input; // Devolvemos el input sin modificar si no coincide el ID
            });

            return {
              ...set,
              repetitions: newInputValue,
              inputs: newInputs, // Actualizamos los inputs del set
            };
          }
          return set; // Devolvemos el set sin modificar si no coincide el ID
        });

        return {
          ...exerciseMap,
          exercise: {
            ...exerciseMap.exercise,
            sets: newSets, // Actualizamos los sets del ejercicio
          },
        };
      }
      return exerciseMap; // Devolvemos el ejercicio sin modificar si no coincide el ID
    });
    setExercices(newExercise);
  };

  const handleDeleteInput = (idInput: number) => {
    const newListExecercises = exercises.map((exerciseMap: Exercise) => {
      const newListSets = exerciseMap.exercise.sets.map((set) => {
        const newInputList = set.inputs.filter((input) => input.id !== idInput);
        return {
          ...set,
          inputs: newInputList,
        };
      });
      return {
        ...exerciseMap,
        exercise: {
          ...exerciseMap.exercise,
          sets: newListSets, // Actualizamos los sets del ejercicio
        },
      };
    });
    setExercices(newListExecercises);
  };

  const addSet = (id: number, idSet: number) => {
    const newExercise = exercises.map((exerciseMap: Exercise) => {
      if (exerciseMap.exercise.id === id) {
        const newSet = exerciseMap.exercise.sets.map((set: Sets) => {
          if (set.id === idSet) {
            const newInputId = Date.now(); // Usamos el timestamp como ID único
            return {
              ...set,
              inputs: set.inputs.concat({
                id: newInputId,
                input: (
                  <div>
                    <Input key={Date.now()} value={""} sx={{ width: 80 }} />
                    <Button>
                      <DeleteIcon onClick={() => handleDeleteInput(newInputId)}/>
                    </Button>
                  </div>
                ),
              }),
            };
          }
          return set;
        });

        return {
          ...exerciseMap,
          exercise: {
            ...exerciseMap.exercise,
            sets: newSet,
          },
        };
      }
      return exerciseMap;
    });
    setExercices(newExercise);
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {exercises.map((exerciseMap: Exercise, index: number) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  sx={{ width: 160, paddingTop: "0.4rem" }}
                  variant="body1"
                >
                  {exerciseMap.exercise.name} - {exerciseMap.exercise.weigth}
                </Typography>
                {exerciseMap.exercise.sets.map((set: Sets) => (
                  <Button
                    key={index}
                    onClick={() => addSet(exerciseMap.exercise.id, set.id)}
                  >
                    <AddIcon />
                  </Button>
                ))}
              </div>
              <div key={exerciseMap.exercise.id}>
                {exerciseMap.exercise.sets.map((set) => (
                  <div key={set.id} style={{ flex: "1" }}>
                    <InputRenderer
                      idExercise={exerciseMap.exercise.id}
                      idSet={set.id}
                      inputs={set.inputs}
                      handlerChange={handleChangeInput}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
