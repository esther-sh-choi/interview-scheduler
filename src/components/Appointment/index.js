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

const Appointment = ({ id, time, interview, interviewers }) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const STATUS = "STATUS";
  const ERROR = "ERROR";

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const [selectedInterview, setSelectedInterview] = useState(interview || null);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = (student, interviewer) => {
    // console.log(student, interviewer);
    setLoadingMsg("Saving...");
    transition(STATUS);

    Axios.put(`/api/appointments/${id}`, {
      interview: { student, interviewer },
    })
      .then((res) => {
        const dataObj = JSON.parse(res.config.data);
        const interviewerId = dataObj.interview.interviewer;
        const interviewerData = interviewers?.find(
          (data) => data.id === interviewerId
        );
        setSelectedInterview({
          ...dataObj.interview,
          interviewer: interviewerData,
        });
      })
      .catch((err) => {
        transition(ERROR);
        setErrorMsg(err);
        back();
      })
      .finally(() => transition(SHOW));
  };

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
      {mode === SHOW && selectedInterview && (
        <Show
          student={selectedInterview.student}
          interviewer={selectedInterview.interviewer}
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
