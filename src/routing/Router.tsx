import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CalendarView from "../screens/CalendarViewScreen";
import BookSlotScreen from "../screens/BookSlotScreen";
import SettingsScreen from "../screens/SettingsScreen";

import HomeIcon from "@mui/icons-material/Home";
import SyncIcon from "@mui/icons-material/Sync";
import SettingsIcon from "@mui/icons-material/Settings";

const Routing: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
              >
                <HomeIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                to="/sync"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
              >
                <SyncIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
              >
                <SettingsIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link to="/book" className="text-blue-500 hover:text-blue-700">
                Book
              </Link>
            </li>
            {/*
              <li>
                <Link to="/configure" className="text-blue-500 hover:text-blue-700">
                  Configure
                </Link>
              </li>
            */}
          </ul>
        </nav>
        <Routes>
          <Route path="/view" element={<CalendarView />} />
          <Route path="/book" element={<BookSlotScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/" element={<CalendarView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Routing;
