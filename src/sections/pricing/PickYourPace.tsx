import Link from "next/link";

function PickYourPace() {
  return (
    <section
      id="pick-your-pace"
      className="bg-neutral flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-2 md:px-0">
        <div className="text-neutral-content flex flex-col items-center justify-center gap-6">
          <h2 className="font-display text-3xl font-semibold lg:text-5xl">
            Not sure which plan fits?
          </h2>
          <p className="max-w-[45ch] text-center text-lg lg:text-xl">
            Try a class first, on us — see how it feels before you commit.
          </p>
          <Link href="/schedule" className="btn btn-primary btn-lg">
            Book a Drop-In Class
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PickYourPace;
