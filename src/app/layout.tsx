import type { Metadata } from "next";
import { Geist, Geist_Mono, Gelasio } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gelasio = Gelasio({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Elias Heininger",
  description: "Designer, Founder, Engineer, Thinker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gelasio.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
