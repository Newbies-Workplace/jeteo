import { AddToCalendarButton } from "add-to-calendar-button-react";
import React from "react";

const CallendarButton = () => {
  return (
    <AddToCalendarButton
      name="Title"
      options={["Apple", "Google"]}
      location="World Wide Web"
      startDate="2023-10-23"
      endDate="2023-10-23"
      startTime="10:15"
      endTime="23:30"
      timeZone="America/Los_Angeles"
    ></AddToCalendarButton>
  );
};

export default CallendarButton;
