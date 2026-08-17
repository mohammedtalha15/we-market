import { Hero } from "@/components/home/Hero";
import { Trust } from "@/components/home/Trust";
import { Results } from "@/components/home/Results";
import { GrowthSystem } from "@/components/home/GrowthSystem";
import { Industries } from "@/components/home/Industries";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Services } from "@/components/home/Services";
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
      <Results />
      <GrowthSystem />
      <Industries />
      <FeaturedWork />
      <Services />
      <Culture />
      <Testimonials />
      <Insights />
      <Faq />
      <FinalCta />
    </>
  );
}
