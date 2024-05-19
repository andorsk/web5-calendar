import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CalendarView from "../screens/CalendarViewScreen";
// import Book from "../screens/BookSlotScreen";
// import Configure from "../screens/ConfigureScreen";

import HomeIcon from "@mui/icons-material/Home";
import SyncIcon from "@mui/icons-material/Sync";
import SettingsIcon from "@mui/icons-material/Settings";

const Routing: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a
                href="/"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
              >
                <HomeIcon className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="/"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
              >
                <SyncIcon className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="/"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
              >
                <SettingsIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </li>
            {/* <li>
                <a href="/book">Book</a>
                </li>
                <li>
                <a href="/configure">Configure</a>
                </li> */}
          </ul>
        </nav>
        <Routes>
          <Route path="/view" element={<CalendarView />} />
          <Route path="/" element={<CalendarView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Routing;
