import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setEvents, setLoading, setError } from "../store/slices/calendarSlice";
import GoogleApiClient from "./GoogleAPIClient";
import { gapi } from "gapi-script";

const LoadCalendarEvents: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isClientInitialized, setIsClientInitialized] = useState(false);

  useEffect(() => {
    if (isClientInitialized) {
      const loadCalendarEvents = () => {
        console.log("loading calendar events");
        dispatch(setLoading(true));
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
            console.log("got response", response.result.items);
            const events = response.result.items.map((item: any) => ({
              id: item.id,
              summary: item.summary,
              participants:
                item.attendees?.map((attendee: any) => attendee.email) || [],
              start: { dateTime: item.start.dateTime },
              end: { dateTime: item.end.dateTime },
            }));
            console.log("got events", events);
            dispatch(setEvents(events));
            dispatch(setLoading(false));
          })
          .catch((error: any) => {
            dispatch(setError("Error loading events"));
            dispatch(setLoading(false));
          });
      };

      loadCalendarEvents();
    }
  }, [isClientInitialized, dispatch]);

  return <GoogleApiClient onClientInit={() => setIsClientInitialized(true)} />;
};

export default LoadCalendarEvents;
