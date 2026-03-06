import { MouseEventHandler, ReactNode } from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, onClick, className = "" }: ButtonProps) {
  return (
    <button className={`${styles.root} ${className}`.trim()} onClick={onClick}>
      {children}
    </button>
  );
}