// import styles from "./Card.module.css";
import Link from "next/link";
import { AuthButton } from "../auth/AuthButton";

type HeaderProps = {
  isLoggedIn: boolean;
};

export default function Header({ isLoggedIn }: HeaderProps) {
  return (
    <div className="w-full flex justify-between items-center">
      <div>
        <h1 className="text-sm uppercase text-pixel">
          <Link href={"/"}>
            Tomodex
          </Link>
        </h1>
      </div>
      <div>
        <AuthButton isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}