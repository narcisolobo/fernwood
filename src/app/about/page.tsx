import ComeSeeItForYourself from "@/sections/our-story/ComeSeeItForYourself";
import HowWeGotHere from "@/sections/our-story/HowWeGotHere";
import InsideTheStudio from "@/sections/our-story/InsideTheStudio";
import OurStory from "@/sections/our-story/OurStory";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "About Us",
  description:
    "How Fernwood Pilates Studio grew from one instructor teaching every class herself into a full studio team in West Hollywood — read our story.",
};

function AboutUsPage() {
  return (
    <main>
      <OurStory />
      <HowWeGotHere />
      <InsideTheStudio />
      <ComeSeeItForYourself />
    </main>
  );
}

export { metadata };
export default AboutUsPage;
