import type { Metadata } from "next";
import { Archivo } from "next/font/google";

// ponytail: the original wide grotesk is unknown; Archivo's width axis at 125% stands in.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-neutra" });

export const metadata: Metadata = {
  title: "NEUTRA — Transforming the Energy",
};

export default function NeutraLayout({ children }: { children: React.ReactNode }) {
  return <div className={archivo.variable}>{children}</div>;
}
