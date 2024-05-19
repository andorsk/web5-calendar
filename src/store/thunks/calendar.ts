import { createAsyncThunk } from "@reduxjs/toolkit";
import { Web5 } from "@web5/api";
import { CalendarEvent } from "../../types";
import {
  DWNCalendarStorage,
  CalendarService,
} from "../../services/calendarService";

let calendarService: CalendarService;

const init = async () => {
  const { web5, did: myDid } = await Web5.connect();
  const calendarStorage = new DWNCalendarStorage(web5);
  const calendarService = new CalendarService(calendarStorage);
};

export const fetchEvents = createAsyncThunk<
  CalendarEvent[],
  void,
  { rejectValue: string }
>("calendar/fetchEvents", async (_, { rejectWithValue }) => {
  try {
    return await calendarService.getCalendarEvents();
  } catch (error) {
    return rejectWithValue("Failed to fetch events");
  }
});

export const addNewEvent = createAsyncThunk<
  string,
  CalendarEvent,
  { rejectValue: string }
>("calendar/addNewEvent", async (event, { rejectWithValue }) => {
  try {
    return await calendarService.createCalendarEvent(event);
  } catch (error) {
    return rejectWithValue("Failed to add new event");
  }
});

export const updateExistingEvent = createAsyncThunk<
  void,
  CalendarEvent,
  { rejectValue: string }
>("calendar/updateExistingEvent", async (event, { rejectWithValue }) => {
  try {
    await calendarService.updateCalendarEvent(event);
  } catch (error) {
    return rejectWithValue("Failed to update event");
  }
});

export const deleteExistingEvent = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("calendar/deleteExistingEvent", async (id, { rejectWithValue }) => {
  try {
    await calendarService.deleteCalendarEvent(id);
  } catch (error) {
    return rejectWithValue("Failed to delete event");
  }
});
