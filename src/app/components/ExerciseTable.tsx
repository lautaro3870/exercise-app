import { useState } from "react";

import { Button, Input } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Exercise = {
  exercise: {
    id: number;
    name: string;
    weigth: string;
    inputs: JSX.Element[];
    sets: [
      {
        id: number;
        repetitions: string;
      }
    ];
  };
};

const data: Exercise[] = [
  {
    exercise: {
      id: 1,
      name: "Pecho sentado",
      weigth: "70",
      inputs: [],
      sets: [
        {
          id: 1,
          repetitions: "10, 8, 9",
        },
      ],
    },
  },
  {
    exercise: {
      id: 2,
      name: "Sentadill",
      weigth: "70",
      inputs: [],
      sets: [
        {
          id: 1,
          repetitions: "10, 8, 9",
        },
      ],
    },
  },
  {
    exercise: {
      id: 3,
      name: "Pecho sentado",
      weigth: "70",
      inputs: [],
      sets: [
        {
          id: 1,
          repetitions: "10, 8, 9",
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

  const [exercises, setExercices] = useState<Exercise[]>(data);

  const addSet = (id: number) => {
    const newExercise = exercises.map(
      (exerciseMap: Exercise) => {
        if (exerciseMap.exercise.id === id) {
          exerciseMap.exercise.inputs = exerciseMap.exercise.inputs.concat(
            <Input
              id="outlined-basic"
              key={Date.now()}
              value={exerciseMap.exercise.sets[0].repetitions}
              sx={{ marginLeft: 3, width: 80 }}
            />
          );
        }
        return exerciseMap;
      }
    );
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
              <Button
                key={index}
                onClick={() => addSet(exerciseMap.exercise.id)}
              >
                <AddIcon />
              </Button>
              <div
                key={Date.now()}
                style={{
                  width: 200,
                  overflowX: "scroll",
                  display: "flex",
                  border: "1px solid #ccc",
                }}
              >
                {exerciseMap.exercise.inputs.map((input, index) => (
                  <div key={index}>
                    <Input
                      id="outlined-basic"
                      key={Date.now()}
                      value={input?.props.value}
                      sx={{ marginLeft: 3, width: 80 }}
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
