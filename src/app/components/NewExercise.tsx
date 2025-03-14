import { Button } from "@mui/material";
import { Input } from "@mui/material";
import { NewExerciseProps } from "../interfaces/interfaces";
import DeleteIcon from "@mui/icons-material/Delete";

export default function NewExercise({
  addNewExercise,
  name,
  setName,
  weigth,
  setWeigth,
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
        onChange={(e: any) => setName(e.target.value)}
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
        onChange={(e: any) => setWeigth(e.target.value)}
      />
      <Button onClick={addNewExercise}>Exercise</Button>
      <Button variant="outlined" color="error" onClick={openModal}>
        <DeleteIcon />
      </Button>
    </div>
  );
}
