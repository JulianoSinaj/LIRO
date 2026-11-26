import { CinematicIntro } from "@/components/CinematicIntro";
import { Essence } from "@/components/sections/Essence";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { Menu } from "@/components/sections/Menu";
import { Navbar } from "@/components/sections/Navbar";
import { Reservation } from "@/components/sections/Reservation";
import { SignatureDishes } from "@/components/sections/SignatureDishes";

export default function Home() {
  return (
    <CinematicIntro src="/video/Cinematic-Intro.mp4">
      <Navbar />
      <main>
        <Hero />
        <Essence />
        <SignatureDishes />
        <Menu />
        <Location />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
    </CinematicIntro>
  );
}
