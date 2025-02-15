import { useState } from "react";
import { Button, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { InputRenderer } from "@/app/components/InputRenderer";

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
      weigth: "70",
      sets: [
        {
          id: 1,
          repetitions: "10, 8, 9",
          inputs: [
            {
              id: 1,
              input: <Input defaultValue={"10, 8, 9"} sx={{width: 80}}/>,
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
      weigth: "70",
      sets: [
        {
          id: 1,
          repetitions: "10, 10, 10",
          inputs: [
            {
              id: 1,
              input: <Input defaultValue={"10, 10, 10"} sx={{width: 80}}/>,
            },
          ],
        },
      ],
    },
  },
];

export default function ExerciseTable() {
  //   const renderInputs = (inputs: any) => {
  //     return (
  //       <div
  //         style={{
  //           width: 200,
  //           overflowX: "scroll",
  //           display: "flex",
  //           border: "1px solid #ccc",
  //         }}
  //       >
  //         {inputs.map((input: any, index: number) => (
  //           <div key={index} style={{ marginRight: 10, flexShrink: 0 }}>
  //             <Input
  //               id="outlined-basic"
  //               key={Date.now()}
  //               value={input?.repetitions}
  //               sx={{ marginLeft: 3, width: 80 }}
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   };

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
                  input: <Input defaultValue={newInputValue} sx={{width: 80}}/>, // Actualizamos el valor del input
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

  const [exercises, setExercices] = useState<Exercise[]>(data);

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
                input: <Input key={Date.now()} value={""} sx={{width: 80}}/>,
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
                  border: "1px solid",
                  width: 140,
                  height: 33,
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ marginLeft: 15 }}>
                  {exerciseMap.exercise.name}
                </span>
              </div>
              {exerciseMap.exercise.sets.map((set: Sets) => (
                <Button
                  key={index}
                  onClick={() => addSet(exerciseMap.exercise.id, set.id)}
                >
                  <AddIcon />
                </Button>
              ))}
              <div
                key={exerciseMap.exercise.id}
              >
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
