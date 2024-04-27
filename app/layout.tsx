import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cadbury11",
  description: "Video Conferencing Grid UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#121214] h-screen scrollbar-hide overflow-hidden`}
      >
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
