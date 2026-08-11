import { Hero } from "@/components/home/Hero";
import { Trust } from "@/components/home/Trust";
import { About } from "@/components/home/About";
import { GrowthSystem } from "@/components/home/GrowthSystem";
import { Industries } from "@/components/home/Industries";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Results } from "@/components/home/Results";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Culture } from "@/components/home/Culture";
import { Testimonials } from "@/components/home/Testimonials";
import { Insights } from "@/components/home/Insights";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trust />
      <About />
      <GrowthSystem />
      <Industries />
      <FeaturedWork />
      <Results />
      <Services />
      <Process />
      <Culture />
      <Testimonials />
      <Insights />
      <Faq />
      <FinalCta />
    </>
  );
}
