import type { Metadata } from "next";
import { Quicksand, Caveat, Fredoka } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Playing with Nathaaa",
  description: "Buka kartu kenangan lucu Hello Kitty dan lihat galeri foto-foto manis penuh cinta!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${quicksand.variable} ${caveat.variable} ${fredoka.variable}`}>
      <body className="min-h-screen bg-kitty-dream bg-kawaii-grid text-zinc-800 antialiased selection:bg-rose-300 selection:text-rose-950 font-[family-name:var(--font-quicksand)] relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
