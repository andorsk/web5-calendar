import { type WorkingHours } from "../store/slices/workingHoursSlice";

export const getWorkingHours = (
  day: string,
  workingHours: WorkingHours,
): [string, string] => {
  return workingHours[day];
};

export const generateSlots = (
  day: string,
  workingHours: WorkingHours,
  slotDuration: number,
): string[] => {
  const [startHour, endHour] = getWorkingHours(day, workingHours);
  const start = new Date();
  const end = new Date();
  start.setHours(
    parseInt(startHour.split(":")[0]),
    parseInt(startHour.split(":")[1]),
    0,
    0,
  );
  end.setHours(
    parseInt(endHour.split(":")[0]),
    parseInt(endHour.split(":")[1]),
    0,
    0,
  );

  const slots: string[] = [];
  while (start < end) {
    const slotStart = new Date(start);
    start.setMinutes(start.getMinutes() + slotDuration);
    slots.push(
      `${slotStart.toLocaleTimeString()} - ${start.toLocaleTimeString()}`,
    );
  }
  return slots;
};
