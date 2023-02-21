import React from "react";

import DayListItem from "./DayListItem";

export default function DayList({ days, day, setDay }) {
  return (
    <ul>
      {days.map((item) => (
        <DayListItem
          key={item.id}
          name={item.name}
          spots={item.spots}
          selected={item.name === day}
          setDay={setDay}
        />
      ))}
    </ul>
  );
}
