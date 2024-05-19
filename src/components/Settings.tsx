import React, { useState, useCallback } from "react";
import GoogleApiClient from "./GoogleApiClient";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { setEvents, setLoading, setError } from "../store/slices/calendarSlice";
import { gapi } from "gapi-script";
import { AppDispatch } from "../store";

type GoogleAccount = {
  id: string;
  name: string;
  token: string;
};

type Calendar = gapi.client.calendar.CalendarListEntry;

const Settings: React.FC = () => {
  const [isClientInitialized, setIsClientInitialized] = useState(false);
  const [accounts, setAccounts] = useState<GoogleAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [calendarIds, setCalendarIds] = useState<{ [key: string]: string[] }>(
    {},
  );
  const [newCalendarId, setNewCalendarId] = useState<string>("");
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const handleGoogleClientInit = () => {
    setIsClientInitialized(true);
  };

  const handleNewAccount = useCallback((user: gapi.auth2.GoogleUser) => {
    const profile = user.getBasicProfile();
    const account = {
      id: profile.getId(),
      name: profile.getName(),
      token: user.getAuthResponse().id_token,
    };
    setAccounts((prevAccounts) => {
      // Check if the account already exists
      if (prevAccounts.some((acc) => acc.id === account.id)) {
        return prevAccounts;
      }
      return [...prevAccounts, account];
    });
  }, []);

  const handleCalendarsFetched = (fetchedCalendars: Calendar[]) => {
    setCalendars(fetchedCalendars);
  };

  const addCalendarId = () => {
    if (newCalendarId && selectedAccount) {
      const updatedCalendarIds = { ...calendarIds };
      if (!updatedCalendarIds[selectedAccount]) {
        updatedCalendarIds[selectedAccount] = [];
      }
      updatedCalendarIds[selectedAccount].push(newCalendarId);
      setCalendarIds(updatedCalendarIds);
      setNewCalendarId("");
    }
  };

  const loadGoogleCalendarEvents = () => {
    dispatch(setLoading(true));
    console.log("loading calendar events");

    const promises = accounts.flatMap((account) =>
      (calendarIds[account.id] || []).map((calendarId) =>
        gapi.client.calendar.events
          .list({
            calendarId: calendarId,
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: "startTime",
          })
          .then((response) => {
            console.log(`Response for calendar ID ${calendarId}:`, response);
            return response.result.items;
          }),
      ),
    );

    console.log("awaiting promises");
    Promise.all(promises)
      .then((results) => {
        const events = results.flat().map((item: any) => ({
          id: item.id,
          summary: item.summary,
          participants:
            item.attendees?.map((attendee: any) => attendee.email) || [],
          start: { dateTime: item.start.dateTime },
          end: { dateTime: item.end.dateTime },
        }));
        console.log("events", events);
        dispatch(setEvents(events));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.error("Error loading events:", error);
        dispatch(setError("Error loading events"));
        dispatch(setLoading(false));
      });
  };

  const syncSources = () => {
    loadGoogleCalendarEvents();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <GoogleApiClient
        onClientInit={handleGoogleClientInit}
        onNewAccount={handleNewAccount}
        onCalendarsFetched={handleCalendarsFetched}
      />
      {isClientInitialized && (
        <div>
          <h3 className="text-xl mt-4">Google Accounts</h3>
          <ul>
            {accounts.map((account) => (
              <li key={account.id}>
                {account.name} ({account.id})
                <Button
                  variant="contained"
                  onClick={() => setSelectedAccount(account.id)}
                >
                  Select
                </Button>
              </li>
            ))}
          </ul>
          {selectedAccount && (
            <div>
              <h3 className="text-xl">Available Calendars</h3>
              <ul>
                {calendars.map((calendar) => (
                  <li key={calendar.id}>
                    {calendar.summary} ({calendar.id})
                    <Button
                      variant="contained"
                      onClick={() => setNewCalendarId(calendar.id || "")}
                    >
                      Use this Calendar
                    </Button>
                  </li>
                ))}
              </ul>
              <TextField
                label="New Calendar ID"
                value={newCalendarId}
                onChange={(e) => setNewCalendarId(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={addCalendarId}
              >
                Add Calendar ID
              </Button>
              <div className="mt-4">
                <h3 className="text-xl">Configured Calendar IDs</h3>
                <ul>
                  {(calendarIds[selectedAccount] || []).map((id, index) => (
                    <li key={index}>{id}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={loadGoogleCalendarEvents}
            className="mt-4"
          >
            Load Google Calendar Events
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={syncSources}
            className="mt-4"
          >
            Sync Calendars
          </Button>
        </div>
      )}
    </div>
  );
};

export default Settings;
