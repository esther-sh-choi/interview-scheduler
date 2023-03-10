import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "./InterviewerListItem";

import "./InterviewerList.scss";

const InterviewerList = ({ interviewers, setInterviewer, value }) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewer) => (
          <InterviewerListItem
            key={interviewer.id}
            {...interviewer}
            selected={interviewer.id === value}
            // set the value of the id here instead of InterviewerListItem to reduce number of props being passed down
            // Compass W07D3 Refactoring Interviewer Components
            setInterviewer={() => {
              setInterviewer(interviewer.id);
            }}
          />
        ))}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
