import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setWorkingHours } from "../store/slices/workingHoursSlice";

const ConfigureScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workingHours = useSelector((state: RootState) => state.workingHours);
  const [newWorkingHours, setNewWorkingHours] = useState(workingHours);

  const handleSave = () => {
    dispatch(setWorkingHours(newWorkingHours));
  };

  const handleChange = (day: string, start: string, end: string) => {
    setNewWorkingHours({
      ...newWorkingHours,
      [day]: [start, end],
    });
  };

  return (
    <div>
      <h1>ConfigureScreen</h1>
      <form>
        {Object.keys(newWorkingHours).map((day) => (
          <div key={day}>
            <label>{day}</label>
            <input
              type="time"
              value={newWorkingHours[day][0]}
              onChange={(e) =>
                handleChange(day, e.target.value, newWorkingHours[day][1])
              }
            />
            <input
              type="time"
              value={newWorkingHours[day][1]}
              onChange={(e) =>
                handleChange(day, newWorkingHours[day][0], e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ConfigureScreen;
