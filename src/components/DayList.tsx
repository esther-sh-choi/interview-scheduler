import React from "react";

import DayListItem from "./DayListItem";

type DayListProps = {
  days: {
    id: number;
    name: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
    spots: number;
  }[];
  value: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  setDay: (
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"
  ) => void;
};

const DayList = ({ days, value, setDay }: DayListProps): JSX.Element => {
  return (
    <ul>
      {days.map((day) => (
        <DayListItem
          key={day.id}
          {...day}
          selected={day.name === value}
          // set the value of the day here instead of DayListItem
          setDay={() => setDay(day.name)}
        />
      ))}
    </ul>
  );
};

export default DayList;
