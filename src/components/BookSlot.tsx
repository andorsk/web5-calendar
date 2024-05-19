import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MeetingType from "./MeetingType";
import Calendar from "./Calendar";
import AvailableSlots from "./AvailableSlots";

const BookSlot: React.FC = () => {
  const [step, setStep] = useState<"type" | "calendar" | "slots">("type");
  const [selectedMeetingType, setSelectedMeetingType] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  const events = useSelector((state: RootState) => state.calendar.events);
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

  const handleSelectMeetingType = (type: string) => {
    setSelectedMeetingType(type);
    setStep("calendar");
  };

  const handleSelectDay = (day: string) => {
    setSelectedDay(day);
    setStep("slots");
  };

  return (
    <div>
      <h1>Book a Slot</h1>
      {step === "type" && <MeetingType onSelect={handleSelectMeetingType} />}
      {step === "calendar" && <Calendar onSelectDay={handleSelectDay} />}
      {step === "slots" && <AvailableSlots selectedDay={selectedDay} />}
    </div>
  );
};

export default BookSlot;
