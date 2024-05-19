import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setEvents } from "../store/slices/calendarSlice";
import { gapi } from "gapi-script";

const LoadCalendarEvents: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadCalendarEvents = () => {
      gapi.client.calendar.events
        .list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: "startTime",
        })
        .then((response: any) => {
          const events = response.result.items;
          dispatch(setEvents(events));
        });
    };

    loadCalendarEvents();
  }, [dispatch]);

  return null; // This component does not render anything visible
};

export default LoadCalendarEvents;
