import React from "react";

import classNames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
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
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
