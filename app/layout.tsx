import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "FitZen - Тренировки, Растяжка и Медитация",
  description: "Комплексное веб-приложение для физического и ментального здоровья",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
