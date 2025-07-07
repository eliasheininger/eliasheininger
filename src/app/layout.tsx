import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ArrowUpRight } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elias Heininger",
  description: "A founder, designer, coder, creator and builder at heart",
};

const links = [
  {
    name: "instagram",
    href: "https://instagram.com/eliasheininger",
  },
  {
    name: "github",
    href: "https://github.com/eliasheininger",
  },
];

const navLinks = [
  { name: "life", href: "/" },
  { name: "blog", href: "/blog" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-black">
          <nav className="w-full flex justify-start px-6 pt-8 bg-black text-white max-w-2xl mx-auto">
            <ul className="max-w-2xl flex gap-8 text-white/80 text-[1rem] font-light bg-black">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:underline transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {children}
      </body>
    </html>
  );
}
