import { RefObject } from "react";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type Sets = {
  id: string;
  repetitions: string;
};

export type Exercise = {
  id: string;
  name: string;
  weigth: string;
  sets: Sets[];
  tab: number;
};

export interface ExerciseProps {
  tab: number;
}

export interface InputRendererProps {
  idExercise: string;
  idSet: string;
  repetitions: string;
  handlerChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    idExercise: string,
    idSet: string
  ) => void;
  handlerDeleteSet: (idExercise: string, idSet: string) => void;
}

export interface NewExerciseProps {
  name: RefObject<HTMLInputElement>;
  weigth: RefObject<HTMLInputElement>;
  addNewExercise: () => void;
  openModal: () => void;
}
