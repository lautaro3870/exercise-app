import React from "react";
import { Inputs } from "./ExerciseTable";

interface InputRendererProps {
  inputs: Inputs[];
  idExercise: number; // ID del ejercicio
  idSet: number; // ID del set
  handlerChange: (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>,
    idExercise: number,
    idSet: number
  ) => void;
}

export const InputRenderer: React.FC<InputRendererProps> = ({
  inputs,
  handlerChange,
  idExercise,
  idSet,
}) => {
  return (
    <div
      style={{
        width: 200,
        overflowX: "auto",
        display: "flex",
        border: "1px solid #ccc",
        flexDirection: "row",
        gap: 10
      }}
    >
      {inputs.map((input) => (
        <div key={input.id} style={{ minWidth: "60px", flex: "none" }}>
          {React.cloneElement(input.input as React.ReactElement, {
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              handlerChange(input.id, event, idExercise, idSet),
          })}
        </div>
      ))}
    </div>
  );
};
