import React from "react";

import "./styles.scss";
import Header from "./Header.tsx";
import Show from "./Show.tsx";
import Empty from "./Empty.tsx";
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
    transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(EMPTY)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onSave={handleSave} onCancel={back} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer}
          onSave={transition(SHOW)}
          onCancel={back}
        />
      )}
    </article>
  );
};

export default Appointment;
