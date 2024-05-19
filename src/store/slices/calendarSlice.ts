import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarState, CalendarEvent, CalendarConfig } from "../../types";

// Improved initialState with additional configurations and states
const initialState: CalendarState = {
  events: [],
  config: {
    workingHours: {
      Monday: [{ start: "09:00", end: "17:00" }],
      Tuesday: [{ start: "09:00", end: "17:00" }],
    },
    googleCalendarIntegration: false,
  },
  loading: false,
  error: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<CalendarEvent[]>) {
      console.log("setting events", action.payload);
      state.events = action.payload;
    },
    addEvent(state, action: PayloadAction<CalendarEvent>) {
      state.events.push(action.payload);
    },
    updateEvent(state, action: PayloadAction<CalendarEvent>) {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id,
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(
        (event) => event.id !== action.payload,
      );
    },
    setConfig(state, action: PayloadAction<CalendarConfig>) {
      state.config = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  setConfig,
  setLoading,
  setError,
} = calendarSlice.actions;
export default calendarSlice.reducer;
