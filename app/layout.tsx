import type { Metadata } from "next";
import { Barlow_Condensed, Instrument_Serif, Inter, Jost } from "next/font/google";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "./globals.css";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Jost({ subsets: ["latin"], variable: "--font-display" });
const condensed = Barlow_Condensed({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-condensed" });

export const metadata: Metadata = {
  title: "favhiker — your social diary",
  description: "Keep a diary of the food, stays, films, shows, books and music you love.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${display.variable} ${condensed.variable}`}>
      <body>
        <ReactLenis root />
        {children}
      </body>
    </html>
  );
}
