import React from "react";

import classNames from "classnames";

import "./DayListItem.scss";

type DayListItemProps = {
  selected: boolean;
  spots: number;
  name: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  setDay: (
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"
  ) => void;
};

const DayListItem = (props: DayListItemProps): JSX.Element => {
  const { selected, spots, name, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });

  const formatSpots = () => {
    if (!spots) {
      return "no spots remaining";
    }

    if (spots === 1) {
      return "1 spot remaining";
    }

    return `${spots} spots remaining`;
  };

  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};

export default DayListItem;
