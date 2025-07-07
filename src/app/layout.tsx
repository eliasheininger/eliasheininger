// Test change: This is a comment to check git status and VS Code source control
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
                  <a
                    href={link.href}
                    className="hover:underline transition cursor-pointer"
                  >
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
