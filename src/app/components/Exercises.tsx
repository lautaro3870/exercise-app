import { Button, Typography } from "@mui/material";
import { Input } from "@mui/material";
import { InputRenderer } from "@/app/components/InputRenderer";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Sets = {
  id: string;
  repetitions: string;
};

type Exercise = {
  id: string;
  name: string;
  weigth: string;
  sets: Sets[];
};

export default function Exercises() {
  const [exercises, setExercices] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState("");

  useEffect(() => {
    const exerciseFromLocalStorage = JSON.parse(
      window.localStorage.getItem("exercises") || "[]"
    );
    setExercices(exerciseFromLocalStorage);
  }, []);

  const addNewExercise = () => {
    const newExerciseObject: Exercise = {
      id: uuidv4(),
      name: newExercise,
      weigth: "30kg",
      sets: [
        {
          id: uuidv4(),
          repetitions: "",
        },
      ],
    };
    const newExercisesList = exercises.concat(newExerciseObject);
    setExercices(newExercisesList);
    localStorage.setItem("exercises", JSON.stringify(newExercisesList));
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
    localStorage.setItem("exercises", JSON.stringify(newExercise));
  };

  const addSet = (idExercise: string) => {
    const newExercise = exercises.map((exerciseMap: Exercise) => {
      if (exerciseMap.id === idExercise) {
        const newSet: Sets = {
          id: uuidv4(),
          repetitions: "",
        };
        exerciseMap.sets.push(newSet);
      }
      return exerciseMap;
    });
    setExercices(newExercise);
    localStorage.setItem("exercises", JSON.stringify(newExercise));
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Input
              onChange={(e) => {
                setNewExercise(e.target.value);
              }}
            />
            <Button onClick={addNewExercise}>New exercise</Button>
          </div>
          {exercises.length !== 0 ? (
            exercises.map((exerciseMap: Exercise, index: number) => (
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
                    sx={{ width: 140, paddingTop: "0.4rem" }}
                    variant="body1"
                  >
                    {exerciseMap.name} - {exerciseMap.weigth}
                  </Typography>
                  <Button key={index} onClick={() => addSet(exerciseMap.id)}>
                    <AddIcon />
                  </Button>
                  {/* {exerciseMap.sets.map((set: Sets) => (
                  ))} */}
                </div>

                <div
                  key={exerciseMap.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: 200,
                    overflowX: "scroll",
                  }}
                >
                  {exerciseMap.sets.map((set) => (
                    <div
                      key={set.id}
                      style={{
                        flex: "1",
                      }}
                    >
                      <InputRenderer
                        idExercise={exerciseMap.id}
                        idSet={set.id}
                        repetitions={set.repetitions}
                        handlerChange={handleChangeInput}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
