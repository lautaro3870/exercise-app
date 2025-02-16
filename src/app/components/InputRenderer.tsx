import React from "react";
import { Button, Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { InputRendererProps } from "../interfaces/interfaces";

export const InputRenderer: React.FC<InputRendererProps> = ({
  handlerChange,
  idExercise,
  idSet,
  repetitions,
  handlerDeleteSet
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Input
        sx={{ width: 80, marginRight: "-1rem" }}
        key={idSet}
        value={repetitions}
        type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handlerChange(event, idExercise, idSet);
        }}
      />
      <Button
        onClick={() => {
          handlerDeleteSet(idExercise, idSet);
        }}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
};
