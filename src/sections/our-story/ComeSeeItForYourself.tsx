function ComeSeeItForYourself() {
  return (
    <section
      id="visit"
      className="bg-neutral flex items-center justify-center py-20"
    >
      <div className="container mx-auto px-2 md:px-0">
        <div className="text-neutral-content flex flex-col items-center justify-center gap-6">
          <h2 className="font-display text-2xl font-semibold uppercase lg:text-3xl">
            Come see it for yourself
          </h2>
          <p className="text-neutral-content/70 lg:text-md max-w-[45ch] text-center text-sm">
            First class is on us. No membership required.
          </p>
          <button className="btn btn-primary btn-lg">
            Book a Drop-In Class
          </button>
        </div>
      </div>
    </section>
  );
}

export default ComeSeeItForYourself;
