import React from "react";

import DayListItem from "./DayListItem";

const DayList = ({ days, value, setDay }) => {
  return (
    <ul>
      {days.map((day) => (
        <DayListItem
          key={day.id}
          {...day}
          selected={day.name === value}
          setDay={setDay}
        />
      ))}
    </ul>
  );
};

export default DayList;
