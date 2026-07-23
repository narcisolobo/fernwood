import Link from "next/link";

function FindYourMatch() {
  return (
    <section
      id="find-your-match"
      className="bg-accent text-accent-content flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-2 md:px-0">
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="font-display text-3xl font-semibold lg:text-5xl">
            Find your match.
          </h2>
          <p className="max-w-[45ch] text-center text-lg lg:text-xl">
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
