import CallToAction from "@/sections/hero/CallToAction";
import Hero from "@/sections/hero/Hero";
import Instructors from "@/sections/instructors/Instructors";
import Philosophy from "@/sections/philosophy/Philosophy";
import { Metadata } from "next";

const meta = {
  title: "Fernwood Pilates Studio - Demo",
  description:
    "Reformer and mat Pilates in West Hollywood. Grow stronger from the ground up with classes built around precision, breath, and room to move at your own pace.",
};

const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://fernwood.narcisolobo.com",
    type: "website",
  },
};

function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <Instructors />
      <CallToAction />
    </main>
  );
}

export { metadata };
export default Home;
