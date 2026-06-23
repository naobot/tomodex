// import styles from "./Card.module.css";
import Link from "next/link";
import { AuthButton } from "../auth/AuthButton";

type HeaderProps = {
  isLoggedIn: boolean;
};

export default function Header({ isLoggedIn }: HeaderProps) {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 style={{ margin: 0, fontSize: "var(--text-sm)", fontFamily: "var(--font-pixel)", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text)" }}>
        <Link href={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          Tomodex
        </Link>
      </h1>
      <AuthButton isLoggedIn={isLoggedIn} />
    </div>
  );
}