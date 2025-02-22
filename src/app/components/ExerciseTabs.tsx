"use client";
import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { TabPanelProps } from "../interfaces/interfaces";
import Exercises from "./Exercises";

function CustomTabPanel(props: TabPanelProps) {
  const { value, index, ...other } = props;

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
          <Exercises tab={value} />
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

  const getTabFromDayOfTheWeek = () => {
    const today = new Date().getDay();
    switch (today) {
      case 1:
        setValue(1);
        break;
      case 2:
        setValue(0);
        break;
      case 3:
        setValue(2);
        break;
      case 5:
        setValue(3);
        break;
      case 6:
        setValue(4);
        break;
      default:
        setValue(0);
    }
  };

  useEffect(() => {
    getTabFromDayOfTheWeek();
  }, []);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable">
          <Tab label="Push" />
          <Tab label="Leg" />
          <Tab label="Pull" />
          <Tab label="Arms" />
          <Tab label="P + E" />
        </Tabs>
      </Box>
      {exerciseTabsIndex.map((_, i: number) => (
        <CustomTabPanel value={value} index={i} key={i}></CustomTabPanel>
      ))}
    </div>
  );
}
