import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarState, CalendarEvent, CalendarConfig } from "../../types";
import {
  fetchEvents,
  addNewEvent,
  updateExistingEvent,
  deleteExistingEvent,
} from "../thunks/calendar";

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addNewEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewEvent.fulfilled, (state, action) => {
        state.loading = false;
        // Handle successful addition of the event (e.g., fetch the events again)
      })
      .addCase(addNewEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateExistingEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingEvent.fulfilled, (state) => {
        state.loading = false;
        // Handle successful update of the event (e.g., fetch the events again)
      })
      .addCase(updateExistingEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteExistingEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingEvent.fulfilled, (state) => {
        state.loading = false;
        // Handle successful deletion of the event (e.g., fetch the events again)
      })
      .addCase(deleteExistingEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
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
