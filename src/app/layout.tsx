import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suprith M | Mechatronics Engineer – Portfolio",
  description:
    "Interactive portfolio of Suprith M — Mechatronics Engineer specializing in Hardware, IoT, Automation, and Embedded Systems. Explore projects, skills, and experience.",
  keywords: [
    "Mechatronics",
    "IoT",
    "Embedded Systems",
    "Arduino",
    "Python",
    "Portfolio",
    "Suprith M",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
