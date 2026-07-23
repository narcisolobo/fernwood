import ComeSeeItForYourself from "@/sections/our-story/ComeSeeItForYourself";
import HowWeGotHere from "@/sections/our-story/HowWeGotHere";
import InsideTheStudio from "@/sections/our-story/InsideTheStudio";
import OurStory from "@/sections/our-story/OurStory";
import { Metadata } from "next";

const meta = {
  title: "About Us - Fernwood Pilates Studio",
  description:
    "How Fernwood Pilates Studio grew from one instructor teaching every class herself into a full studio team in West Hollywood — read our story.",
};

const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://fernwood.narcisolobo.com/about",
    type: "website",
  },
};

function AboutUsPage() {
  return (
    <main className="flex-1">
      <OurStory />
      <HowWeGotHere />
      <InsideTheStudio />
      <ComeSeeItForYourself />
    </main>
  );
}

export { metadata };
export default AboutUsPage;
