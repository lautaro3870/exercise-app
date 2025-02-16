import React from "react";
import { Button, Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface InputRendererProps {
  idExercise: string;
  idSet: string;
  repetitions: string;
  handlerChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    idExercise: string,
    idSet: string
  ) => void;
}

export const InputRenderer: React.FC<InputRendererProps> = ({
  handlerChange,
  idExercise,
  idSet,
  repetitions,
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
        sx={{ width: 90, marginRight: "-1rem" }}
        key={idSet}
        value={repetitions}
        type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handlerChange(event, idExercise, idSet);
        }}
      />
      <Button>
        <DeleteIcon />
      </Button>
    </div>
  );
};
