import React from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function NavigationButtons() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-2 w-[100%]">
      <div className="flex flex-row gap-2 w-[100%]">
        <Button onClick={() => navigate(-1)} text="Go back!" />
        <Button onClick={() => navigate(`/`)} text="Home!" />
      </div>
    </div>
  );
}

export default NavigationButtons;
