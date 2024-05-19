import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";
import workingHoursReducer from "./slices/workingHoursSlice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    workingHours: workingHoursReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
