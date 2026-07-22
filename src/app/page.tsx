import CallToAction from "@/sections/hero/CallToAction";
import Hero from "@/sections/hero/Hero";
import Instructors from "@/sections/instructors/Instructors";
import Philosophy from "@/sections/philosophy/Philosophy";
import { Metadata } from "next";

const metadata: Metadata = {
  authors: [
    {
      url: "https://narcisolobo.com",
      name: "Narciso Lobo",
    },
  ],
  description:
    "Reformer and mat Pilates in West Hollywood. Grow stronger from the ground up with classes built around precision, breath, and room to move at your own pace.",
  robots: {
    index: false,
    follow: false,
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
