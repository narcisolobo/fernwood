import Link from "next/link";

function FindYourMatch() {
  return (
    <section
      id="find-your-match"
      className="bg-neutral text-neutral-content flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-2 md:px-0">
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="font-display text-2xl font-semibold uppercase lg:text-3xl">
            Find Your Match
          </h2>
          <p className="text-neutral-content/70 lg:text-md max-w-[45ch] text-center text-sm">
            Every instructor brings something different — browse the schedule to
            try a few.
          </p>
          <Link href="/schedule" className="btn btn-primary btn-lg">
            View Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FindYourMatch;
