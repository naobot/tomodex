import { MouseEventHandler, ReactNode } from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
}

export default function Button({ children, onClick, className = "", disabled, type }: ButtonProps) {
  return (
    <button className={`${styles.root} ${className}`.trim()} onClick={onClick} disabled type={type}>
      {children}
    </button>
  );
}