import React, { useEffect } from "react";
import { gapi } from "gapi-script";

interface GoogleApiClientProps {
  onClientInit: () => void;
  onNewAccount: (account: gapi.auth2.GoogleUser) => void;
  onCalendarsFetched: (
    calendars: gapi.client.calendar.CalendarListEntry[],
  ) => void;
}

const GoogleApiClient: React.FC<GoogleApiClientProps> = ({
  onClientInit,
  onNewAccount,
  onCalendarsFetched,
}) => {
  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/calendar.readonly",
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          if (authInstance.isSignedIn.get()) {
            onClientInit();
            const currentUser = authInstance.currentUser.get();
            onNewAccount(currentUser);
            fetchCalendars();
          }
        })
        .catch((error: any) => {
          console.error("Error initializing Google API client:", error);
        });
    };

    gapi.load("client:auth2", initClient);
  }, [onClientInit, onNewAccount, onCalendarsFetched]);

  const handleAddAccount = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then((user) => {
      onNewAccount(user);
      fetchCalendars();
    });
  };

  const fetchCalendars = () => {
    gapi.client.calendar.calendarList
      .list()
      .then((response) => {
        const calendars = response.result.items || [];
        onCalendarsFetched(calendars);
      })
      .catch((error) => {
        console.error("Error fetching calendars:", error);
      });
  };

  return (
    <div>
      <button onClick={handleAddAccount}>Add Google Account</button>
    </div>
  );
};

export default React.memo(GoogleApiClient);
