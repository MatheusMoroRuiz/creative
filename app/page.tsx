import { HeroShowreel } from "@/components/HeroShowreel";
import { Manifesto } from "@/components/Manifesto";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesIndex } from "@/components/ServicesIndex";
import { ProcessSection } from "@/components/ProcessSection";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroShowreel />
      <Manifesto />
      <ProjectsSection />
      <ServicesIndex />
      <ProcessSection />
      <CTASection />
    </>
  );
}
