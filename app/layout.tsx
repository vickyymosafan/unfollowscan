import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cek Siapa yang Tidak Follow Balik - Instagram Follower Analyzer",
  description: "Analisis followers Instagram Anda secara privat. Cek siapa yang tidak follow balik, mutual followers, dan fans. Semua proses di perangkat Anda.",
  keywords: ["instagram", "followers", "following", "tidak follow balik", "mutual", "analyzer"],
  icons: {
    icon: "/Logo.svg",
    shortcut: "/Logo.svg",
    apple: "/Logo.svg",
  },
  other: {
    language: "id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
