import React from "react";
import { EventType } from "../types";
type EventTypeCardProps = {
  eventType: EventType;
  onSelect: (eventType: EventType) => void;
};

const EventTypeCard: React.FC<EventTypeCardProps> = ({
  eventType,
  onSelect,
}) => {
  const hours = eventType.duration.getUTCHours();
  const minutes = eventType.duration.getUTCMinutes();

  return (
    <div
      className="border p-4 rounded shadow-md hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(eventType)}
    >
      <h3 className="text-xl font-bold">{eventType.name}</h3>
      <p className="text-sm text-gray-600">{eventType.description}</p>
      <p className="text-sm text-gray-600">
        Duration: {hours > 0 ? `${hours} hours ` : ""}
        {minutes} minutes
      </p>
    </div>
  );
};

export default EventTypeCard;
