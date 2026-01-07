import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyunu Blog - Back Office",
  description: "Administrative dashboard for Hyunu Blog",
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
