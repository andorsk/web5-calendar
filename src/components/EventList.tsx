import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const EventList: React.FC = () => {
  const events = useSelector((state: RootState) => state.calendar.events);

  const handleEventClick = (eventId: string) => {
    // Handle event click
    console.log("Event clicked:", eventId);
  };

  return (
    <div className="container mx-auto p-4">
      <ul className="space-y-4">
        {events?.map((event) => (
          <li
            key={event.id}
            className="event-item p-4 bg-white rounded shadow-md hover:bg-blue-50 cursor-pointer"
            onClick={() => handleEventClick(event.id)}
          >
            <div className="event-summary text-lg font-semibold text-gray-800">
              {event.summary}
            </div>
            <div className="event-time text-sm text-gray-600">
              {new Date(event.start.dateTime).toLocaleString()} -{" "}
              {new Date(event.end.dateTime).toLocaleString()}
            </div>
            <ul className="event-participants mt-2 space-y-1">
              {event.participants.map((participant, index) => (
                <li key={index} className="participant text-sm text-gray-700">
                  {participant}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
