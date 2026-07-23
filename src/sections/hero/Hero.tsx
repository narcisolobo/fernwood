import Image from "next/image";
import Link from "next/link";
import Pilates from "@/images/pilates.jpg";

function Hero() {
  return (
    <section id="home" className="flex min-h-[70vh] items-center py-4">
      <div className="container mx-auto">
        <div className="hero">
          <div className="hero-content flex-col px-2 py-0 md:px-0 lg:flex-row-reverse">
            <div id="hero-image" className="shadow">
              <Image
                src={Pilates}
                alt="A woman with dark hair in a low bun performs a controlled reformer exercise, seated upright with one leg extended, in a sunlit studio with brick walls and rows of reformers."
                className="rounded-lg"
                loading="eager"
              />
            </div>
            <div id="hero-copy" className="flex flex-col items-start gap-6">
              <div className="bg-base-200 border-base-300 text-base-content/80 w-fit rounded-lg border px-2 py-1 text-xs">
                West Hollywood · Reformer & Mat Pilates
              </div>
              <h1 className="font-display text-4xl lg:text-6xl">
                Grow stronger from the ground up.
              </h1>
              <p className="text-lg lg:text-xl">
                Reformer and Mat classes built around precision, breath, and
                room to move at your own pace.
              </p>
              <div className="flex flex-col items-center gap-6 lg:flex-row">
                <Link href="/schedule" className="btn btn-lg btn-primary">
                  Book a Drop-In Class
                </Link>
                <Link href="/schedule" className="link-primary">
                  View Schedule →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
