import React, { useState } from "react";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import Settings from "./Settings";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";

const CalendarView: React.FC = () => {
  const [view, setView] = useState<"calendar" | "list" | "settings">("list");

  const events = useSelector((state: RootState) => state.calendar.events);

  const handleViewChange = (newView: "calendar" | "list" | "settings") => {
    setView(newView);
  };

  return (
    <div className="container mx-auto p-4">
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
          <Button
            startIcon={<SettingsIcon />}
            onClick={() => handleViewChange("settings")}
            color={view === "settings" ? "primary" : "inherit"}
            sx={{
              ...(view !== "settings" && {
                backgroundColor: "#e0e0e0",
              }),
            }}
          >
            Settings
          </Button>
        </ButtonGroup>
      </div>

      {view === "list" ? (
        <EventList />
      ) : view === "calendar" ? (
        <EventCalendar />
      ) : (
        <Settings />
      )}
    </div>
  );
};

export default CalendarView;
