import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CalendarView from "../screens/CalendarViewScreen";
import Book from "../screens/BookSlotScreen";
import Configure from "../screens/ConfigureScreen";

const Routing: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/calendar_view">Calendar View</a>
            </li>
            <li>
              <a href="/book">Book</a>
            </li>
            <li>
              <a href="/configure">Configure</a>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/calendar_view" element={<CalendarView />} />
          <Route path="/book" element={<Book />} />
          <Route path="/configure" element={<Configure />} />
          <Route path="/" element={<CalendarView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Routing;
