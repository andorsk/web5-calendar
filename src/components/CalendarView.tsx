import React, { useState } from "react";
import GoogleApiClient from "./GoogleAPIClient";
import LoadCalendarEvents from "./LoadCalendarEvents";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CalendarView: React.FC = () => {
  const [isClientReady, setIsClientReady] = useState(false);

  const events = useSelector((state: RootState) => state.calendar.events);

  const handleClientInit = () => {
    setIsClientReady(true);
  };

  return (
    <div>
      <h1>Calendar View</h1>
      <GoogleApiClient onClientInit={handleClientInit} />
      {isClientReady && <LoadCalendarEvents />}
      <EventList />
    </div>
  );
};

export default CalendarView;
