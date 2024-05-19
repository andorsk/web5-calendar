import { SlotConfig, WorkingHours, CalendarEvent } from "../types";

export const generateSlots = (
  day: string,
  date: string, // Added date parameter
  workingHours: WorkingHours,
  step: number,
  slotDuration: number,
  unavailableSlots: CalendarEvent[] = [],
): SlotConfig[] => {
  const slots: SlotConfig[] = [];
  const dayWorkingHours = workingHours[day];

  if (!dayWorkingHours || dayWorkingHours.length === 0) {
    return slots; // No working hours for the given day
  }

  dayWorkingHours.forEach(({ start, end }) => {
    const startTime = new Date(`${date}T${start}`);
    const endTime = new Date(`${date}T${end}`);

    let currentTime = new Date(startTime);

    console.log("Generating slots for", day, startTime, endTime);
    while (currentTime < endTime) {
      const slotStart = new Date(currentTime);
      const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);

      if (slotEnd > endTime) break;

      const isUnavailable = unavailableSlots.some((slot) => {
        const unavailableStart = new Date(slot.start.dateTime);
        const unavailableEnd = new Date(slot.end.dateTime);
        return (
          (slotStart >= unavailableStart && slotStart < unavailableEnd) ||
          (slotEnd > unavailableStart && slotEnd <= unavailableEnd)
        );
      });

      const slot: SlotConfig = {
        duration: new Date(slotDuration * 60000),
        name: `Slot ${slotStart.toTimeString().split(" ")[0]} - ${
          slotEnd.toTimeString().split(" ")[0]
        }`,
        start: slotStart,
        end: slotEnd,
        available: !isUnavailable,
      };

      slots.push(slot);

      currentTime = new Date(currentTime.getTime() + step * 60000);
    }
  });

  return slots;
};
