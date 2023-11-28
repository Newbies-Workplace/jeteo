import { AddToCalendarButton } from "add-to-calendar-button-react";
import { AddToCalendarButtonProps } from "add-to-calendar-button-react/dist/AddToCalendarButton";
import React from "react";

const CallendarButton = (props:AddToCalendarButtonProps) => {
  
  return (
    <AddToCalendarButton
      name={props.name}
      options={["Apple", "Google", "iCal", "Microsoft365", "MicrosoftTeams", "Outlook.com", "Yahoo"]}
      location={props.location}
      startDate={props.startDate}
      endDate={props.endDate}
      startTime={props.startTime}
      endTime={props.endTime}
      timeZone={props.timeZone}
      forceOverlay={true}
      // buttonStyle="custom"
      // customCss="margin: 0; border: 5px solid black"

      // probably without it look better the checkmark is unnecessary
      hideCheckmark={true}
      hideBackground={true}
      
    ></AddToCalendarButton>
  );
};

export default CallendarButton;
