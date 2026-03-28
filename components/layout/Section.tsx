import type { ReactNode } from "react";

type Props = {
  title: string;
  spacing?: "md" | "lg";
  children: ReactNode;
};

export default function Section({ title, spacing = "md", children }: Props) {
  const spaceClass = spacing === "lg" ? "my-6" : "my-4";
  return (
    <section className={spaceClass}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}