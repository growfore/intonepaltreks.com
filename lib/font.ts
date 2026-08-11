import { Livvic, Montserrat, Satisfy } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const livvic = Livvic({
  subsets: ["latin"],
  variable: "--font-livvic",
  weight: ["400", "500", "600", "700", "900"]
})

export const satisfy = Satisfy({
  subsets: ["latin"],
  variable: "--font-script",
  weight:['400']
})
