import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkingHours } from "../types";
import { defaultConfig } from "../config";

const initialState: WorkingHours = defaultConfig.workingHours;

const workingHoursSlice = createSlice({
  name: "workingHours",
  initialState,
  reducers: {
    setWorkingHours: (state, action: PayloadAction<WorkingHours>) => {
      return action.payload;
    },
  },
});

export const { setWorkingHours } = workingHoursSlice.actions;

export default workingHoursSlice.reducer;
