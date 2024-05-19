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
  start: { dateTime: string };
  end: { dateTime: string };
}

export interface CalendarState {
  events: CalendarEvent[];
  config: EventConfig;
}

export interface CalendarConfig {
  workingHours: WorkingHours;
  googleCalendarIntegration: boolean;
}
