import React from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const EventCalendar: React.FC = () => {
  const events = useSelector((state: RootState) => state.calendar.events);

  const formattedEvents = events.map((event) => ({
    id: event.id,
    title: "(hidden)", //event.summary,
    start: new Date(event.start.dateTime),
    end: new Date(event.end.dateTime),
  }));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Calendar View</h2>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week", "day"]}
        defaultView="month"
        onSelectEvent={(event) => console.log("Event clicked:", event)}
      />
    </div>
  );
};

export default EventCalendar;
