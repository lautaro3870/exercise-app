"use client";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { TabPanelProps } from "../interfaces/interfaces";
import ExerciseTable from "./ExerciseTable";

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <ExerciseTable />
        </Box>
      )}
    </div>
  );
}

export default function ExerciseTabs() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const exerciseTabsIndex = [1, 2, 3, 4, 5];

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
        >
          <Tab label="Pull" />
          <Tab label="Leg" />
          <Tab label="Push" />
          <Tab label="P + E" />
          <Tab label="Arms" />
        </Tabs>
      </Box>
      {exerciseTabsIndex.map((_, i: number) => (
        <CustomTabPanel value={value} index={i} key={i}></CustomTabPanel>
      ))}
    </div>
  );
}
