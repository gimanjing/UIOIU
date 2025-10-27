import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logistics Route Optimizer",
  description: "Advanced route optimization and logistics management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TopNav />
        <main className="min-h-screen bg-pitch-black p-6">
          {children}
        </main>
      </body>
    </html>
  );
}