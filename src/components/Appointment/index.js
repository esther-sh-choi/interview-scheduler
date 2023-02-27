import React, { useState } from "react";

import Axios from "axios";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

const Appointment = ({ id, time, interview, interviewers, bookInterview }) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const STATUS = "STATUS";
  const ERROR = "ERROR";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // const [selectedInterview, setSelectedInterview] = useState(interview || null);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    setLoadingMsg("Saving...");
    transition(STATUS);

    // id is the appointment id and interview is the object that includes student name and interviewer id.
    bookInterview(id, interview).then((res) => {
      if (res) {
        transition(SHOW);
      }
    });
  };

  // const handleSave = (student, interviewer) => {
  //   // console.log(student, interviewer);
  //   setLoadingMsg("Saving...");
  //   transition(STATUS);
  // };

  const handleDelete = () => {
    setLoadingMsg("Deleting...");
    transition(STATUS);
    Axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err);
        transition(ERROR);
      })
      .finally(() => transition(EMPTY));
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
      {mode === STATUS && <Status message={loadingMsg} />}
      {mode === ERROR && <Error message={errorMsg} onClose={back} />}
    </article>
  );
};

export default Appointment;
