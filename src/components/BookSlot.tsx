import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MeetingType from "./MeetingType";
import Calendar from "./Calendar";
import AvailableSlots from "./AvailableSlots";
import { generateSlots } from "../lib/calendarUtils";
import BookSlotForm from "./BookSlotForm";
import { CalendarEvent } from "../types";

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

  const handleSlotBooking = (event: CalendarEvent) => {
    console.log("Booked event:", event);
    // Add your logic to handle the booked event (e.g., save to database, update state, etc.)
  };

  console.log("booking a slot");
  return (
    <div>
      <h1>Book a Slot 1</h1>
      {step === "type" && <MeetingType onSelect={handleSelectMeetingType} />}
      {step === "calendar" && <Calendar onSelectDay={handleSelectDay} />}
      {step === "slots" && <AvailableSlots selectedDay={selectedDay} />}
      <BookSlotForm
        onSubmit={handleSlotBooking}
        startTime="2024-05-19T09:00"
        endTime="2024-05-19T09:30"
        duration={30}
      />
    </div>
  );
};

export default BookSlot;
