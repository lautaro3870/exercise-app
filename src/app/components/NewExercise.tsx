import { Button } from "@mui/material";
import { Input } from "@mui/material";
import { NewExerciseProps } from "../interfaces/interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function NewExercise({
  addNewExercise,
  name,
  weigth,
  openModal,
}: NewExerciseProps) {
  const [nameInput, setNameInput] = useState('');
  return (
    <div>
      <Input
        id="name"
        data-testid="nameInput"
        sx={{
          width: 110,
        }}
        placeholder="Exercise"
        inputRef={name}
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <Input
        id="weigth"
        type="number"
        sx={{
          width: 28,
          marginLeft: 2,
          marginRight: 2,
        }}
        placeholder="Kg"
        inputRef={weigth}
      />
      <Button onClick={addNewExercise}>Exercise</Button>
      <Button variant="outlined" color="error" onClick={openModal}>
        <DeleteIcon />
      </Button>
    </div>
  );
}
