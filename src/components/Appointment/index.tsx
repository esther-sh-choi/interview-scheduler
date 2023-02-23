import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

type AppointmentProps = {
  id: number;
  time: string;
  interview: {
    student: string;
    interviewer: { id: number; name: string; avatar: string };
  };
  interviewers: { id: number; name: string; avatar: string }[];
};

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
}: AppointmentProps): JSX.Element => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const handleSave = (student: string, interviewer: number | null) => {
    console.log(student, interviewer);
    transition(SAVING);
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onSave={handleSave} onCancel={back} />
      )}
      {mode === EDIT && interview && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer.id}
          onSave={handleSave}
          onCancel={back}
        />
      )}
    </article>
  );
};

export default Appointment;
