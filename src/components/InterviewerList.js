import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

const InterviewerList = ({ interviewers, onChange, value }) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewer) => (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.name === value}
            setInterviewer={() => {
              onChange(interviewer.id);
            }}
          />
        ))}
      </ul>
    </section>
  );
};

export default InterviewerList;
