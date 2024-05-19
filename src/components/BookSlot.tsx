import React, { useState } from "react";
import EventTypeCard from "./EventTypeCard";
import DateTimeSelection from "./DateTimeSelection";
import { EventType } from "../types";

const meetingTypes: EventType[] = [
  {
    name: "Type 1",
    duration: new Date(30 * 60 * 1000),
    description: "Quick meeting",
  },
  {
    name: "Type 2",
    duration: new Date(30 * 60 * 1000),
    description: "Longer Meeting",
  },
];

const BookSlot: React.FC = () => {
  const [selectedMeetingType, setSelectedMeetingType] =
    useState<EventType | null>(null);

  const handleMeetingTypeSelect = (eventType: EventType) => {
    console.log("setting type");
    setSelectedMeetingType(eventType);
  };

  return (
    <div>
      {!selectedMeetingType ? (
        <div>
          {meetingTypes.map((type) => (
            <EventTypeCard
              key={type.name}
              eventType={type}
              onSelect={handleMeetingTypeSelect}
            />
          ))}
        </div>
      ) : (
        <div>
          <DateTimeSelection meetingType={selectedMeetingType} />
        </div>
      )}
    </div>
  );
};

export default BookSlot;
