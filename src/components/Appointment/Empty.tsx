import React from "react";

type EmptyProps = {
  onAdd: () => void;
};

const Empty = ({ onAdd }: EmptyProps): JSX.Element => {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
};

export default Empty;
