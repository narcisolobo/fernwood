import CallToAction from "@/sections/hero/CallToAction";
import Hero from "@/sections/hero/Hero";
import Instructors from "@/sections/instructors/Instructors";
import Philosophy from "@/sections/philosophy/Philosophy";

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

export default Home;
