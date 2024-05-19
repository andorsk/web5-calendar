import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import MeetingType from "./MeetingType";
import Calendar from "./Calendar";
import AvailableSlots from "./AvailableSlots";
import { generateSlots } from "../lib/calendarUtils";
import BookSlotForm from "./BookSlotForm";
import { CalendarEvent } from "../types";
import DateTimeSelection from "./DateTimeSelection";

const BookSlot: React.FC = () => {
  console.log("booking a slot");
  const handleSlotBooking = () => {};
  return (
    <div>
      <DateTimeSelection />
    </div>
  );
};

export default BookSlot;
