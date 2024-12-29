import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "SaffaEnterPrises Dashboard",
  description:
    "A ideal invoice and task management software for SaffaEnterPrises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link
          rel="shortcut icon"
          href="/saffaenterprises.png"
          type="image/x-icon"
        />
      </head>
      <Analytics />
      <SpeedInsights />
      <body className={`${lato.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
