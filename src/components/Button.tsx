import React, { MouseEventHandler } from "react";

import classNames from "classnames";

import "components/Button.scss";

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  confirm: boolean;
  danger: boolean;
  children: string;
  clickable: boolean;
};

const Button = ({
  onClick,
  disabled,
  confirm,
  danger,
  clickable,
  children,
}: ButtonProps): JSX.Element => {
  // const { onClick, disabled, confirm, danger, children } = props;

  console.log(clickable);

  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger,
  });

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
