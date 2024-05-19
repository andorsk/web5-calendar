// config.ts
export interface DailyHours {
  start: string;
  end: string;
}

export interface Config {
  workingHours: {
    Monday: DailyHours[];
    Tuesday: DailyHours[];
    Wednesday: DailyHours[];
    Thursday: DailyHours[];
    Friday: DailyHours[];
    Saturday: DailyHours[];
    Sunday: DailyHours[];
  };
  googleCalendarIntegration: boolean;
}

export const defaultConfig: Config = {
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
