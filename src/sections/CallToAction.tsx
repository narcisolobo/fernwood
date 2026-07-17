function CallToAction() {
  return (
    <section
      id="offer"
      className="bg-neutral flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-2 md:px-0">
        <div className="text-neutral-content flex flex-col items-center justify-center gap-6">
          <h2 className="font-display text-2xl font-semibold uppercase lg:text-3xl">
            Your first class is on us
          </h2>
          <p className="lg:text-md max-w-[45ch] text-center text-sm">
            New to Fernwood? Grab a complimentary drop-in and see what the
            hype&lsquo;s about.
          </p>
          <button className="btn btn-primary btn-lg">
            Claim Your First Class
          </button>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
