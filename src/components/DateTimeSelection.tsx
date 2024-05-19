import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./index.css";
import { SlotConfig } from "../types";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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

// Mock slots
const mockSlots: SlotConfig[] = [
  {
    name: "Slot 1",
    duration: new Date(2024, 4, 19, 1, 0),
    start: new Date(2024, 4, 19, 10, 0),
    end: new Date(2024, 4, 19, 10, 30),
    available: true,
  },
  {
    name: "Slot 2",
    duration: new Date(2024, 4, 19, 1, 0),
    start: new Date(2024, 4, 19, 11, 0),
    end: new Date(2024, 4, 19, 11, 30),
    available: false,
  },
  {
    name: "Slot 3",
    duration: new Date(2024, 4, 19, 1, 0),
    start: new Date(2024, 4, 19, 12, 0),
    end: new Date(2024, 4, 19, 12, 30),
    available: true,
  },
];

const meetingTypes: SlotConfig[] = [
  {
    name: "Type 1",
    duration: new Date(2024, 4, 19, 1, 0),
    start: new Date(),
    end: new Date(),
    available: true,
  }, // Add actual duration
  {
    name: "Type 2",
    duration: new Date(2024, 4, 19, 1, 0),
    start: new Date(),
    end: new Date(),
    available: true,
  },
];

const DateTimeSelection: React.FC = () => {
  const [step, setStep] = useState<"type" | "date" | "time">("type");
  const [selectedMeetingType, setSelectedMeetingType] =
    useState<SlotConfig | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredSlots, setFilteredSlots] = useState<SlotConfig[]>([]);

  const handleMeetingTypeChange = (event: SelectChangeEvent<string>) => {
    const meetingType = meetingTypes.find(
      (type) => type.name === event.target.value,
    );
    setSelectedMeetingType(meetingType || null);
    setStep("date");
  };

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
        console.log(
          `Comparing slot.start: ${slot.start.toDateString()} with selectedDate: ${selectedDate.toDateString()}`,
        );
        return slot.start.toDateString() === selectedDate.toDateString();
      });

      console.log("setting times", times);
      setFilteredSlots(times);
    } else {
      setFilteredSlots([]);
    }
  }, [selectedDate]);

  return (
    <div className="container mx-auto p-4">
      {step === "type" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select Meeting Type</h2>
          <FormControl fullWidth>
            <InputLabel id="meeting-type-label">Meeting Type</InputLabel>
            <Select
              labelId="meeting-type-label"
              value={selectedMeetingType?.name || ""}
              onChange={handleMeetingTypeChange}
            >
              {meetingTypes.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
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
