import CallToAction from "@/sections/hero/CallToAction";
import Hero from "@/sections/hero/Hero";
import Instructors from "@/sections/instructors/Instructors";
import Philosophy from "@/sections/philosophy/Philosophy";
import { Metadata } from "next";

const metadata: Metadata = {
  description:
    "Reformer and mat Pilates in West Hollywood. Grow stronger from the ground up with classes built around precision, breath, and room to move at your own pace.",
  openGraph: {
    title: "Fernwood Pilates Studio - Demo",
    type: "website",
    url: "https://fernwood.narcisolobo.com",
    description:
      "Reformer and mat Pilates in West Hollywood. Grow stronger from the ground up with classes built around precision, breath, and room to move at your own pace.",
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
