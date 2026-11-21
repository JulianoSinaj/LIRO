import { FeatureBar } from "@/components/sections/FeatureBar";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/MenuSection";
import { Navbar } from "@/components/sections/Navbar";
import { PrivateDining } from "@/components/sections/PrivateDining";
import { Reservation } from "@/components/sections/Reservation";
import { SignatureMenu } from "@/components/sections/SignatureMenu";
import { Story } from "@/components/sections/Story";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureBar />
        <Story />
        <SignatureMenu />
        <MenuSection />
        <PrivateDining />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
