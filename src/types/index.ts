export interface DailyHours {
  start: string;
  end: string;
}

export interface WorkingHours {
  [day: string]: DailyHours[];
}

export interface EventConfig {
  slotDuration: number;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  participants: string[];
  start: { dateTime: string };
  end: { dateTime: string };
}

export interface CalendarState {
  events: CalendarEvent[];
  config: CalendarConfig;
  slotConfig?: SlotConfig[];
  loading: boolean;
  error: string | null;
}

export interface CalendarConfig {
  name?: string;
  workingHours: WorkingHours;
  googleCalendarIntegration: boolean;
}

export type SlotConfig = {
  duration: Date;
  name: string;
  start: Date;
  end: Date;
  available: boolean;
};

export type Config = {
  calendar: CalendarConfig;
};
