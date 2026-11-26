import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { INTRO_STORAGE_KEY } from "@/lib/intro";
import "./globals.css";

/* Titujt — serif editorial, me italic elegant për fjalët e theksuara. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Teksti, navigimi, butonat — sans-serif e lehtë */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  display: "swap",
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
      className={`${cormorant.variable} ${jost.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
        <noscript>
          <style>{"[data-cinematic-intro]{display:none!important}"}</style>
        </noscript>
      </head>
      <body className="min-h-full bg-ink font-sans text-ivory">
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
