import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <section style={{ margin: "var(--space-md) 0" }}>
      <div style={{
        fontFamily: "var(--font-pixel)",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: "var(--color-text)",
        paddingBottom: "4px",
        marginBottom: "var(--space-md)",
      }}>
        {title}
      </div>
      {children}
    </section>
  );
}