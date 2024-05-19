import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkingHours {
  [key: string]: [string, string];
}

const initialState: WorkingHours = {
  Monday: ["09:00", "17:00"],
  Tuesday: ["09:00", "17:00"],
  Wednesday: ["09:00", "17:00"],
  Thursday: ["09:00", "17:00"],
  Friday: ["09:00", "17:00"],
};

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
