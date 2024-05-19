import React, { useEffect } from "react";
import { gapi } from "gapi-script";

interface GoogleApiClientProps {
  onClientInit: () => void;
}

const GoogleApiClient: React.FC<GoogleApiClientProps> = ({ onClientInit }) => {
  useEffect(() => {
    console.log("trying to initialize client");
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
          console.log("initalized Client");
          // Check if the user is already signed in
          const authInstance = gapi.auth2.getAuthInstance();
          if (authInstance.isSignedIn.get()) {
            onClientInit();
          } else {
            authInstance.signIn().then(onClientInit);
          }
        })
        .catch((error: any) => {
          console.error("Error initializing Google API client:", error);
        });
    };

    gapi.load("client:auth2", initClient);
  }, [onClientInit]);

  return null; // This component does not render anything visible
};

export default GoogleApiClient;
