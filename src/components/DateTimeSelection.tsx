import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import { EventType, CalendarEvent, SlotConfig } from "../types";
import { defaultConfig } from "../defaultConfig";
import { generateSlots } from "../lib/calendarUtils";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import BookSlotForm from "./BookSlotForm";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type DateTimeSelectionProps = {
  meetingType: EventType;
};

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  meetingType,
}) => {
  const [step, setStep] = useState<"date" | "time" | "form">("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<SlotConfig | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<SlotConfig[]>([]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setStep("time");
  };

  const handleTimeClick = (time: SlotConfig) => {
    if (time.available) {
      setSelectedTime(time);
      setStep("form");
    }
  };

  useEffect(() => {
    const unavailableSlots: CalendarEvent[] = [
      {
        id: "1",
        summary: "Meeting",
        participants: ["Alice", "Bob"],
        start: { dateTime: new Date("2024-05-20T11:00:00") },
        end: { dateTime: new Date("2024-05-20T11:30:00") },
      },
    ];

    const mockSlots = generateSlots(
      "Monday",
      "2024-05-20", // Specific date for Monday
      defaultConfig.calendar.workingHours,
      15, // step in minutes
      30, // slot duration in minutes
      unavailableSlots,
    );

    console.log("mock lost", mockSlots);
    if (selectedDate) {
      const times = mockSlots.filter(
        (slot) => slot.start.toDateString() === selectedDate.toDateString(),
      );
      setFilteredSlots(times);
    } else {
      setFilteredSlots([]);
    }
  }, [selectedDate]);

  const handleFormSubmit = (event: CalendarEvent) => {
    console.log("Event submitted:", event);
    // Handle the form submission
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Selected Meeting Type: {meetingType.name}
      </h2>
      {step === "date" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select a Date</h2>
          <Calendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={["month"]}
            defaultView="month"
            onSelectSlot={({ start }) => handleDateClick(start)}
            selectable
          />
        </div>
      )}
      {step === "time" && selectedDate && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select a Time</h2>
          <ul>
            {filteredSlots.map((time, index) => (
              <li
                key={index}
                className={`p-4 rounded shadow-md ${
                  time.available
                    ? "bg-white hover:bg-blue-50 cursor-pointer available"
                    : "bg-gray-200 cursor-not-allowed unavailable"
                }`}
                onClick={() => handleTimeClick(time)}
              >
                <span className="text-lg font-bold">
                  {time.start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {time.end.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {step === "form" && selectedTime && (
        <BookSlotForm
          onSubmit={handleFormSubmit}
          startTime={selectedTime.start}
          endTime={selectedTime.end}
          duration={Math.round(
            (selectedTime.end.getTime() - selectedTime.start.getTime()) / 60000,
          )}
        />
      )}
    </div>
  );
};

export default DateTimeSelection;
