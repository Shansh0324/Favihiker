import type { Metadata } from "next";
import { Manrope, Montserrat_Alternates } from "next/font/google";

// ponytail: the original display face is custom; swap in next/font/local with the real file if you own it.
const display = Montserrat_Alternates({ weight: ["500", "600"], subsets: ["latin", "cyrillic"], variable: "--font-milu-display" });
const body = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-milu" });

export const metadata: Metadata = {
  title: "MILU — закуски и гастробоксы с доставкой в Саратове",
};

export default function MiluLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${body.variable}`}>{children}</div>;
}
