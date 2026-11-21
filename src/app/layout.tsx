import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Mrs_Saint_Delafield, Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

/* Titujt — serif editorial (400–600 + italic) */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Teksti dhe navigimi */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sq"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jakarta.variable} ${signature.variable} antialiased`}
    >
      <body className="grain min-h-full bg-ink font-sans text-ivory">
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
