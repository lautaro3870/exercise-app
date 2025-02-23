import { Button } from "@mui/material";
import { Input } from "@mui/material";
import { NewExerciseProps } from "../interfaces/interfaces";
import DeleteIcon from "@mui/icons-material/Delete";

export default function NewExercise({
  addNewExercise,
  name,
  weigth,
  openModal,
}: NewExerciseProps) {
  return (
    <div>
      <Input
        id="name"
        sx={{
          width: 110,
        }}
        placeholder="Exercise"
        inputRef={name}
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
