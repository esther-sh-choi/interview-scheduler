import React, { MouseEventHandler } from "react";

import classNames from "classnames";

import "./InterviewerListItem.scss";

type InterviewerListItemProps = {
  name: string;
  avatar: string;
  selected: boolean;
  setInterviewer: MouseEventHandler<HTMLLIElement>;
};

const InterviewerListItem = ({
  name,
  avatar,
  selected,
  setInterviewer,
}: InterviewerListItemProps): JSX.Element => {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
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
