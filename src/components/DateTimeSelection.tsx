import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import { EventType, SlotConfig } from "../types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

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

// Mock slots
const mockSlots: SlotConfig[] = [
  {
    name: "Slot 1",
    duration: new Date(0, 0, 0, 0, 30),
    start: new Date(2024, 4, 19, 10, 0),
    end: new Date(2024, 4, 19, 10, 30),
    available: true,
  },
  {
    name: "Slot 2",
    duration: new Date(0, 0, 0, 0, 30),
    start: new Date(2024, 4, 19, 11, 0),
    end: new Date(2024, 4, 19, 11, 30),
    available: false,
  },
  {
    name: "Slot 3",
    duration: new Date(0, 0, 0, 0, 30),
    start: new Date(2024, 4, 19, 12, 0),
    end: new Date(2024, 4, 19, 12, 30),
    available: true,
  },
];

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  meetingType,
}) => {
  const [step, setStep] = useState<"date" | "time">("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<SlotConfig[]>([]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setStep("time");
  };

  const handleTimeClick = (time: SlotConfig) => {
    if (time.available) {
      console.log("Selected date and time:", selectedDate, time);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const times = mockSlots.filter((slot) => {
        return slot.start.toDateString() === selectedDate.toDateString();
      });
      setFilteredSlots(times);
    } else {
      setFilteredSlots([]);
    }
  }, [selectedDate]);

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
    </div>
  );
};

export default DateTimeSelection;
