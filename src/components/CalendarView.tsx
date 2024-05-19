import React, { useState } from "react";
import GoogleApiClient from "./GoogleAPIClient";
import LoadCalendarEvents from "./LoadCalendarEvents";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListIcon from "@mui/icons-material/List";

const CalendarView: React.FC = () => {
  const [isClientReady, setIsClientReady] = useState(false);
  const [view, setView] = useState<"calendar" | "list">("list");

  const events = useSelector((state: RootState) => state.calendar.events);

  const handleClientInit = () => {
    setIsClientReady(true);
  };

  const handleViewChange = (newView: "calendar" | "list") => {
    setView(newView);
  };

  return (
    <div className="container mx-auto p-4">
      <GoogleApiClient onClientInit={handleClientInit} />
      {isClientReady && <LoadCalendarEvents />}

      <div className="flex justify-center mb-4">
        <ButtonGroup variant="outlined">
          <Button
            startIcon={<ListIcon />}
            onClick={() => handleViewChange("list")}
            color={view === "list" ? "primary" : "inherit"}
            sx={{
              ...(view !== "list" && {
                backgroundColor: "#e0e0e0",
              }),
            }}
          >
            List View
          </Button>
          <Button
            startIcon={<CalendarMonthIcon />}
            onClick={() => handleViewChange("calendar")}
            color={view === "calendar" ? "primary" : "inherit"}
            sx={{
              ...(view !== "calendar" && {
                backgroundColor: "#e0e0e0",
              }),
            }}
          >
            Calendar View
          </Button>
        </ButtonGroup>
      </div>

      {view === "list" ? (
        <EventList />
      ) : (
        <div>
          {/* Placeholder for calendar view component */}
          <p>Calendar view not implemented yet.</p>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
