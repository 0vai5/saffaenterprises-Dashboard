import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SaffaEnterPrises Invoice Manager",
  description: "A ideal invoice and task management software for small buisnesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/saffaenterprises.png" type="image/x-icon" />
      </head>
      <Analytics/>
      <body className={inter.className}>
      <Header />
        {children}
        </body>
    </html>
  );
}
