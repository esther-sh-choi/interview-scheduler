import React, { MouseEventHandler } from "react";

import classNames from "classnames";

import "components/Button.scss";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  confirm: boolean;
  danger: boolean;
  children: String;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  confirm,
  danger,
  children,
}) => {
  // const { onClick, disabled, confirm, danger, children } = props;

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
