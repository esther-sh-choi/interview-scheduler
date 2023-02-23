import React from "react";

type StatusProps = {
  message: string;
};

const Status = ({ message }: StatusProps): JSX.Element => {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{message}</h1>
    </main>
  );
};

export default Status;
