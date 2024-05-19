import { type WorkingHours } from "../types";
import { defaultConfig } from "../defaultConfig";

export const getWorkingHours = (day: string) => {
  return defaultConfig.calendar?.workingHours[day];
};

export const generateSlots = (
  day: string,
  workingHours: WorkingHours,
  slotDuration: number,
): string[] => {
  const slots: string[] = [];
  return slots;
};
