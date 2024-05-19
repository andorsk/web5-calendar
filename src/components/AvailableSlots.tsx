import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { generateSlots } from "../lib/calendarUtils";

interface AvailableSlotsProps {
  selectedDay: string;
}

const AvailableSlots: React.FC<AvailableSlotsProps> = ({ selectedDay }) => {
  const workingHours = useSelector(
    (state: RootState) => state.calendar.config.workingHours,
  );
  const config = useSelector((state: RootState) => state.calendar.config);

  const slotDuration = 30; //config.slotsConfig[0]; // Duration of slots in minutes
  const availableSlots = generateSlots(selectedDay, workingHours, slotDuration);

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
