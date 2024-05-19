import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import Settings from "../components/Settings";

const ConfigureScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Settings Screen</h1>
      <Settings />
    </div>
  );
};

export default ConfigureScreen;
