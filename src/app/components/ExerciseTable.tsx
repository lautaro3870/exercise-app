import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

type Exercise = {
  exercise: {
    name: string;
    weigth: string;
    sets: string[]
  };
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Exercise[] = [
  {
    exercise: {
      name: "Pecho sentado",
      weigth: "70",
      sets: ['9-8-9', '10-9-8']
    },
  },
];

export default function ExerciseTable() {
  const columns = useMemo<MRT_ColumnDef<Exercise>[]>(
    () => [
      {
        accessorKey: "exercise.name", //access nested data with dot notation
        header: "Ejecicio",
        size: 120,
      },
      {
        accessorKey: "exercise.weigth", //access nested data with dot notation
        header: "Peso",
        size: 90,
      },
      {
        accessorKey: "exercise.sets", //access nested data with dot notation
        header: "Sets",
        size: 190,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnPinning: true,
    layoutMode: "grid-no-grow",
    initialState: {
      columnPinning: { left: ["mrt-row-actions", "exercise.name"] },
    },
    enablePagination: false,
    enableBottomToolbar: false,
    enableFilters: false,
  });

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <MaterialReactTable table={table} />
    </div>
  );
}
