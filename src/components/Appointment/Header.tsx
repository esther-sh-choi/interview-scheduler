import React from "react";

type HeaderProps = {
  time: string;
};

const Header = ({ time }: HeaderProps): JSX.Element => {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
};

export default Header;
