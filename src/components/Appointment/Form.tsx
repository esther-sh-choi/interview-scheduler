import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

type FormProps = {
  onCancel: () => void;
  onSave: (student: string, interviewer: number | null) => void;
  student?: string;
  interviewer?: number | null;
  interviewers: { id: number; name: string; avatar: string }[];
};

const Form = (props: FormProps): JSX.Element => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const handleCancel = () => {
    props.onCancel();
    reset();
  };

  const handleSubmit = () => {
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
            }}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>
          <Button confirm onClick={handleSubmit}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
