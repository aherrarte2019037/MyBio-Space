import type { Metadata } from "next";
import "./tailwind.css";
import { BaseLayout } from "@repo/ui";

export const metadata: Metadata = {
  title: "Kyt",
  description: "Kyt - The Live Media Kit Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BaseLayout forcedTheme="light">{children}</BaseLayout>;
}
