import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fraunces, Manrope } from "next/font/google";

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const sansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`app-root ${displayFont.variable} ${sansFont.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
