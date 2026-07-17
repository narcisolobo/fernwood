import CallToAction from "@/sections/CallToAction";
import Hero from "@/sections/Hero";
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
