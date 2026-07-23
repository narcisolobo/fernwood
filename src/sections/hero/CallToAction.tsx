import Link from "next/link";

function CallToAction() {
  return (
    <section
      id="offer"
      className="bg-neutral flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-2 md:px-0">
        <div className="text-neutral-content flex flex-col items-center justify-center gap-6">
          <h2 className="font-display text-3xl font-semibold lg:text-5xl">
            Your first class is on us.
          </h2>
          <p className="max-w-[45ch] text-center text-lg lg:text-xl">
            New to Fernwood?
            <br />
            Enjoy a <span className="font-semibold">complimentary</span> drop-in
            class and find your flow.
          </p>
          <Link href="/schedule" className="btn btn-primary btn-lg">
            Claim Your First Class
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
