import { Button, Typography } from "@mui/material";
import { Input } from "@mui/material";
import { InputRenderer } from "@/app/components/InputRenderer";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
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
  tab: number;
};

interface ExerciseProps {
  tab: number;
}

export default function Exercises({ tab }: ExerciseProps) {
  const [exercises, setExercices] = useState<Exercise[]>([]);
  const name = useRef<HTMLInputElement>(null);
  const weigth = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const exerciseFromLocalStorage = JSON.parse(
      window.localStorage.getItem(`exercises${tab}`) || "[]"
    );
    setExercices(exerciseFromLocalStorage);
  }, [tab]);

  const setLocalStorage = (tab: number, exercises: Exercise[]) => {
    localStorage.setItem(`exercises${tab}`, JSON.stringify(exercises));
  }

  const addNewExercise = () => {
    const newExerciseObject: Exercise = {
      id: uuidv4(),
      tab: tab,
      name: name?.current?.value || "",
      weigth: weigth?.current?.value || "",
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
              sx={{
                width: 110,
              }}
              placeholder="Exercise"
              inputRef={name}
            />
            <Input
              type="text"
              sx={{
                width: 28,
                marginLeft: 2,
                marginRight: 2,
              }}
              placeholder="Kg"
              inputRef={weigth}
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
                    sx={{ width: 160, paddingTop: "0.4rem", fontSize: "0.9rem" }}
                    variant="body1"
                  >
                    {exerciseMap.name} - {exerciseMap.weigth} <span>kg</span>
                  </Typography>
                  <Button key={index} onClick={() => addSet(exerciseMap.id)}>
                    <AddIcon />
                  </Button>
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
                        handlerDeleteSet={handlerDeleteSet}
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
