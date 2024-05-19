import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MeetingType from "./MeetingType";
import Calendar from "./Calendar";
import AvailableSlots from "./AvailableSlots";
import { generateSlots } from "../lib/calendarUtils";

const BookSlot: React.FC = () => {
  const [step, setStep] = useState<"type" | "calendar" | "slots">("type");
  const [selectedMeetingType, setSelectedMeetingType] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  const events = useSelector((state: RootState) => state.calendar.events);
  const workingHours = useSelector(
    (state: RootState) => state.calendar.config.workingHours,
  );
  const config = useSelector((state: RootState) => state.calendar.config);

  const slotDuration = 30; //config.slotDuration; // Duration of slots in minutes

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
