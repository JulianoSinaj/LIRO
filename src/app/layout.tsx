import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost, Mrs_Saint_Delafield } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { INTRO_STORAGE_KEY } from "@/lib/intro";
import "./globals.css";

/* Titujt — modern serif (Didone) me kontrast të lartë dhe italic elegant.
 * `opsz` përshtat formën sipas madhësisë: vija më të holla në titujt e mëdhenj.
 * Për ta zëvendësuar me Lumiere: next/font/local me skedarët e licencuar. */
const display = Bodoni_Moda({
  variable: "--font-display-face",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

/* Teksti, navigimi, butonat — geometric sans-serif (në frymën e Futura) */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Vetëm për firmën kaligrafike të shefit */
const signature = Mrs_Saint_Delafield({
  variable: "--font-signature-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Taverna Li-Ro — Fine Dining & Steakhouse · Panaja, Vlorë",
  description:
    "Një përvojë fine dining në zemër të natyrës: mish premium në zgarë, peshk i freskët dhe verëra të përzgjedhura në Panaja, Vlorë.",
  openGraph: {
    title: "Taverna Li-Ro — Panaja, Vlorë",
    description:
      "Fine dining & contemporary steakhouse në Panaja, Vlorë. A fine dining experience in the heart of nature.",
    type: "website",
    locale: "sq_AL",
    alternateLocale: ["en_GB"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0908",
};

/**
 * Ekzekutohet para pikturimit të parë: nëse intro është luajtur në këtë sesion,
 * shënon <html> që CSS ta fshehë overlay-in menjëherë (pa "flash" të zi).
 */
const introGateScript = `try{if(sessionStorage.getItem(${JSON.stringify(INTRO_STORAGE_KEY)})==="1")document.documentElement.setAttribute("data-intro-played","")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sq"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${jost.variable} ${signature.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
        <noscript>
          <style>{"[data-cinematic-intro]{display:none!important}"}</style>
        </noscript>
      </head>
      <body className="grain min-h-full bg-ink font-sans text-ivory">
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
