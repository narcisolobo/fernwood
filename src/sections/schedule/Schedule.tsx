function Schedule() {
  return (
    <section id="schedule" className="flex items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h1 className="font-display text-center text-4xl font-semibold uppercase lg:text-6xl">
          Class Schedule
        </h1>
        <p className="text-base-content/70 mx-auto mt-4 max-w-[50ch] text-center">
          Reformer, mat, and everything in between.
        </p>
        <div className="mt-8 flex gap-2">
          <button className="btn btn-soft btn-primary btn-sm">
            All Classes
          </button>
          <button className="btn btn-outline btn-sm">Reformer</button>
          <button className="btn btn-outline btn-sm">Mat</button>
        </div>
      </div>
    </section>
  );
}

export default Schedule;
