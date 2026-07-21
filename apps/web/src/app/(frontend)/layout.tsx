import type { ReactNode } from "react";
import "@gocsa/tokens/variables.css";

export const metadata = {
  title: "GOCSA Community Care",
  description: "Development shell — the public website is built in Sprint 4.",
};

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-brand="gocsa">
      <body>{children}</body>
    </html>
  );
}
