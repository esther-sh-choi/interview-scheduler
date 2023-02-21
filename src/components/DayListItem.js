import React from "react";

import classNames from "classnames";

import "./DayListItem.scss";

export default function DayListItem({ selected, spots, name, setDay, key }) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });

  const formatSpots = (numOfSpots) => {
    if (!numOfSpots) {
      return "no spots remaining";
    }

    if (numOfSpots === 1) {
      return "1 spot remaining";
    }

    return `${numOfSpots} spots remaining`;
  };

  return (
    <li key={key} className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
