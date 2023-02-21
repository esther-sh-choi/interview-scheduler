import React from "react";

import DayListItem from "./DayListItem";

export default function DayList({ days, value, onChange }) {
  return (
    <ul>
      {days.map((day) => (
        <DayListItem
          key={day.id}
          {...day}
          selected={day.name === value}
          setDay={() => {
            onChange(day.id);
          }}
        />
      ))}
    </ul>
  );
}
