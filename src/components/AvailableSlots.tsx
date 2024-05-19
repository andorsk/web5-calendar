import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface AvailableSlotsProps {
  selectedDay: string;
}

const AvailableSlots: React.FC<AvailableSlotsProps> = ({ selectedDay }) => {
  const workingHours = useSelector(
    (state: RootState) => state.calendar.workingHours,
  );
  const config = useSelector((state: RootState) => state.calendar.config);

  const slotDuration = config.slotDuration; // Duration of slots in minutes

  const getWorkingHours = (day: string): [string, string] => {
    return workingHours[day];
  };

  const generateSlots = (day: string): string[] => {
    const [startHour, endHour] = getWorkingHours(day);
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

  const availableSlots = generateSlots(selectedDay);

  return (
    <div>
      <h2>Available Slots for {selectedDay}</h2>
      <ul>
        {availableSlots.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableSlots;
