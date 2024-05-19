import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarState, CalendarEvent, EventConfig } from "../types";

const initialState: CalendarState = {
  events: [],
  config: {
    slotDuration: 30,
  },
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<CalendarEvent[]>) {
      state.events = action.payload;
    },
    setConfig(state, action: PayloadAction<EventConfig>) {
      state.config = action.payload;
    },
    // Add other reducers here if needed
  },
});

export const { setEvents, setConfig } = calendarSlice.actions;
export default calendarSlice.reducer;
