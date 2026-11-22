import { CinematicIntro } from "@/components/CinematicIntro";
import { FeatureBar } from "@/components/sections/FeatureBar";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { MenuSection } from "@/components/sections/MenuSection";
import { Navbar } from "@/components/sections/Navbar";
import { Reservation } from "@/components/sections/Reservation";
import { Story } from "@/components/sections/Story";

export default function Home() {
  return (
    <CinematicIntro src="/video/Cinematic-Intro.mp4">
      <Navbar />
      <main>
        <Hero />
        <FeatureBar />
        <Story />
        {/* <SignatureMenu /> — i fshehur përkohësisht; komponenti mbetet te sections/SignatureMenu.tsx */}
        <MenuSection />
        <Location />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
    </CinematicIntro>
  );
}
