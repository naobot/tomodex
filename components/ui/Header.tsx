// import styles from "./Card.module.css";
import { signIn, signOut } from "next-auth/react";
import Button from "./Button";

type HeaderProps = {
  isLoggedIn: boolean;
};

export default function Header({ isLoggedIn }: HeaderProps) {
  return (
    <div className="w-full flex justify-between items-center">
      <div>
        <h1 className="text-sm uppercase text-pixel">Tomodex</h1>
      </div>
      <div>
        {isLoggedIn ? (
          <Button
            className='text-pixel text-sm'
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </Button>
        ) : (
          <Button
            className='text-pixel text-sm'
            onClick={() => signIn("google")}
          >
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
}