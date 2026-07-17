import Image from "next/image";
import SimoneTeaching from "@/images/our-story/simone-teaching.png";

function OurStory() {
  return (
    <section id="our-story" className="flex items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h1 className="font-display text-center text-4xl font-semibold uppercase lg:text-6xl">
          Our Story
        </h1>
        <p className="text-base-content/70 mx-auto mt-4 max-w-[50ch] text-center">
          Founded on the reformer, not in a boardroom.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr] lg:items-center">
          <Image
            src={SimoneTeaching}
            alt="Simone Vega teaching a reformer class"
            className="rounded-lg"
          />
          <div>
            <span className="bg-primary/15 text-primary mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold">
              Founder, Simone Vega
            </span>
            <p className="mb-4">
              Simone Vega found Pilates almost by accident, rehabbing a shoulder
              injury, and it rewired how she thought about training entirely:
              less about hitting a number, more about hitting the movement
              correctly.
            </p>
            <p className="mb-4">
              She opened Fernwood in West Hollywood in 2019 because she
              couldn&rsquo;t find a studio that took reformer work seriously
              without turning it into a slow, quiet ritual. Her bet: precision
              and intensity aren&rsquo;t opposites. A room can be exacting about
              form and still feel alive.
            </p>
            <p className="mb-4">
              Fernwood grew from Simone teaching every class herself to a small
              team of instructors, each bringing their own specialty — mobility,
              flow, strength — but all held to the same standard: no phoning it
              in, no anonymity, no mirrors to hide behind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurStory;
