import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import FeaturedProjects from "@/components/FeaturedProjects";
import BlogShowcase from "@/components/BlogShowcase";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TechStack />
      <FeaturedProjects />
      <BlogShowcase />
      <ContactSection />
    </main>
  );
}
