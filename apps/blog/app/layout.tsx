import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyunu's Blog",
  description: "A modern blog built with Next.js and monorepo architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
