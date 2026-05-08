import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "QuestLog — Quest Tracker Dashboard",
  description:
    "A fullstack quest and task tracker built with Next.js, TypeScript, Tailwind CSS, and MongoDB.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
