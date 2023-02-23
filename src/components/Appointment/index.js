import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form.tsx";

import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {
  const { time, interview, interviewers } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const handleSave = (student, interviewer) => {
    console.log(student, interviewer);
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onSave={handleSave} onCancel={back} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer}
          onSave={transition(EDIT)}
          onCancel={back}
        />
      )}
    </article>
  );
};

export default Appointment;
