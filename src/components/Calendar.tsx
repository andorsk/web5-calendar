import React, { useState } from "react";

interface CalendarProps {
  onSelectDay: (day: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDay }) => {
  const [selectedDay, setSelectedDay] = useState<string>("");

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    onSelectDay(day);
  };

  // Dummy month view for simplicity
  const days = Array.from({ length: 30 }, (_, i) => `2024-05-${i + 1}`);

  return (
    <div>
      <h2>Select a Day</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDayClick(day)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedDay === day ? "lightblue" : "white",
            }}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
