import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gapi } from "gapi-script";
import { RootState, AppDispatch } from "../store";
import { setEvents } from "../store/slices/calendarSlice";

const CLIENT_ID = "YOUR_CLIENT_ID";
const API_KEY = "YOUR_API_KEY";
const SCOPES = "https://www.googleapis.com/auth/calendar.events.readonly";

const CalendarView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.calendar.events);

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: SCOPES,
        })
        .then(() => {
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
              loadCalendarEvents();
            });
        });
    };
    gapi.load("client:auth2", initClient);
  }, [dispatch]);

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

  return (
    <div>
      <h1>Calendar View</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.summary} ({new Date(event.start.dateTime).toLocaleString()} -{" "}
            {new Date(event.end.dateTime).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
