import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const EventList: React.FC = () => {
  const events = useSelector((state: RootState) => state.calendar.events);

  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          {event.summary} ({new Date(event.start.dateTime).toLocaleString()} -{" "}
          {new Date(event.end.dateTime).toLocaleString()})
        </li>
      ))}
    </ul>
  );
};

export default EventList;
