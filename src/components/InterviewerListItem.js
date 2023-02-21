import React from "react";

import classNames from "classnames";

import "./InterviewerListItem.scss";

const InterviewerListItem = ({
  id,
  name,
  avatar,
  selected,
  setInterviewer,
}) => {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  return (
    <li
      className={interviewerClass}
      onClick={() => {
        setInterviewer(id);
      }}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt="Sylvia Palmer"
      />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
