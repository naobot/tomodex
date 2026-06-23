import { ReactNode, CSSProperties } from "react";

import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Card({ children, className = "", style }: CardProps) {
  return (
    <div className={`card ${styles.root} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}