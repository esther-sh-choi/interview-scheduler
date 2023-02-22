import React from "react";

import DayListItem from "./DayListItem.tsx";

type DayListProps = {
  days: [
    {
      id: number;
      name: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
    }
  ];
};

const DayList = ({ days, value, setDay }: DayListProps): JSX.Element => {
  return (
    <ul>
      {days.map((day) => (
        <DayListItem
          key={day.id}
          {...day}
          selected={day.name === value}
          setDay={() => {
            setDay(day.name);
          }}
        />
      ))}
    </ul>
  );
};

export default DayList;
