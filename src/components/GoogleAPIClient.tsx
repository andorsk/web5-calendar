import React, { useEffect } from "react";
import { gapi } from "gapi-script";

interface GoogleApiClientProps {
  onClientInit: () => void;
}

const GoogleApiClient: React.FC<GoogleApiClientProps> = ({ onClientInit }) => {
  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/calendar.events.readonly",
        })
        .then(() => {
          gapi.auth2.getAuthInstance().signIn().then(onClientInit);
        });
    };

    gapi.load("client:auth2", initClient);
  }, [onClientInit]);

  return null; // This component does not render anything visible
};

export default GoogleApiClient;
