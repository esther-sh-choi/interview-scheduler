import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
}) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    // id is the appointment id and interview is the object that includes student name and interviewer id.
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        // console.log(error);
        transition(ERROR_SAVE, true);
      });
  };

  const handleDelete = () => {
    transition(DELETING, true);

    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
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
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onSave={save} onCancel={back} />
      )}
      {mode === EDIT && interview && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this appointment?"
          onConfirm={handleDelete}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message="Loading..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_SAVE && (
        <Error
          message="There was an error creating/changing appointment. Please try again."
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="There was an error deleting the appointment. Please try again."
          onClose={back}
        />
      )}
    </article>
  );
};

export default Appointment;
