import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import Family from "@/components/Family";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <OurStory />
      <Family />
      <Events />
      <Gallery />
      <RSVPForm />
      <Footer />
    </main>
  );
}
