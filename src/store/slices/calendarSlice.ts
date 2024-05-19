// store/calendarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkingHours {
  [day: string]: [string, string];
}

interface Config {
  slotDuration: number;
}

interface CalendarState {
  events: any[];
  workingHours: WorkingHours;
  config: Config;
}

const initialState: CalendarState = {
  events: [],
  workingHours: {
    Monday: ["09:00", "17:00"],
    Tuesday: ["09:00", "17:00"],
    Wednesday: ["09:00", "17:00"],
    Thursday: ["09:00", "17:00"],
    Friday: ["09:00", "17:00"],
  },
  config: {
    slotDuration: 30,
  },
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<any[]>) {
      state.events = action.payload;
    },
    // Add other reducers here if needed
  },
});

export const { setEvents } = calendarSlice.actions;
export default calendarSlice.reducer;
