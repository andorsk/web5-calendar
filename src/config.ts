import { CalendarConfig } from "./types";

export const defaultConfig: CalendarConfig = {
  workingHours: {
    Monday: [
      { start: "9:00", end: "12:00" },
      { start: "13:00", end: "17:00" },
    ],
    Tuesday: [
      { start: "9:00", end: "12:00" },
      { start: "13:00", end: "17:00" },
    ],
    Wednesday: [
      { start: "9:00", end: "12:00" },
      { start: "13:00", end: "17:00" },
    ],
    Thursday: [
      { start: "9:00", end: "12:00" },
      { start: "13:00", end: "17:00" },
    ],
    Friday: [
      { start: "9:00", end: "12:00" },
      { start: "13:00", end: "17:00" },
    ],
    Saturday: [{ start: "10:00", end: "14:00" }],
    Sunday: [{ start: "10:00", end: "14:00" }],
  },
  googleCalendarIntegration: true,
};
