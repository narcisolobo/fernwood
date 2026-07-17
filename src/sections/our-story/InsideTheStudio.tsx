import Image from "next/image";
import FrontDesk from "@/images/our-story/front-desk.png";
import ReformerRoom from "@/images/our-story/reformer-pilates.png";
import MatRoom from "@/images/our-story/mat-pilates.png";

function InsideTheStudio() {
  return (
    <section id="inside-the-studio" className="flex items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h2 className="font-display text-center text-2xl font-semibold uppercase lg:text-4xl">
          Inside the Studio
        </h2>
        <p className="text-base-content/70 mx-auto mt-4 max-w-[50ch] text-center">
          West Hollywood, right off Santa Monica Blvd.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-4 lg:h-130 lg:grid-cols-2 lg:grid-rows-2">
          <div className="relative aspect-4/3 lg:row-span-2 lg:aspect-auto">
            <Image
              src={FrontDesk}
              alt="Fernwood studio front desk"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="relative aspect-4/3 lg:aspect-auto">
            <Image
              src={ReformerRoom}
              alt="Reformer Pilates room"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="relative aspect-4/3 lg:aspect-auto">
            <Image
              src={MatRoom}
              alt="Mat Pilates room"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InsideTheStudio;
