import React from "react";

interface MeetingTypeProps {
  onSelect: (type: string) => void;
}

const MeetingType: React.FC<MeetingTypeProps> = ({ onSelect }) => {
  return (
    <div>
      <h2>Select Meeting Type</h2>
      <button onClick={() => onSelect("type1")}>Type 1</button>
      <button onClick={() => onSelect("type2")}>Type 2</button>
    </div>
  );
};

export default MeetingType;
