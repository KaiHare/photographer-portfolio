import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";

const serif = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600"],
});

const sans = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`app-root ${serif.variable} ${sans.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
