import { Button, Typography } from "@mui/material";
import { InputRenderer } from "@/app/components/InputRenderer";
import AddIcon from "@mui/icons-material/Add";
import { Exercise, ExerciseProps } from "../interfaces/interfaces";
import { ExercisesHooks } from "../hooks/ExercisesHook";
import NewExercise from "./NewExercise";

export default function Exercises({ tab }: ExerciseProps) {
  const {
    addNewExercise,
    addSet,
    exercises,
    name,
    handleChangeInput,
    handlerDeleteSet,
    weigth,
    openModal,
  } = ExercisesHooks(tab);

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
            <NewExercise
              name={name}
              weigth={weigth}
              addNewExercise={addNewExercise}
              openModal={openModal}
            />
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
                    sx={{
                      width: 175,
                      paddingTop: "0.4rem",
                      fontSize: "0.9rem",
                    }}
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
