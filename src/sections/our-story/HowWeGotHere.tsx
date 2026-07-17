interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timeline: TimelineItem[] = [
  {
    year: "2016",
    title: "The injury",
    description:
      "Simone rehabs a shoulder injury on a reformer and rethinks how she trains.",
  },
  {
    year: "2019",
    title: "Fernwood opens",
    description:
      "A single studio room on Santa Monica Blvd, Simone teaching every class herself.",
  },
  {
    year: "2021",
    title: "Building the team",
    description:
      "Simone personally trains the first instructors — Mara and Devon join.",
  },
  {
    year: "Today",
    title: "A full studio",
    description:
      "Five instructors, daily classes, and the same standard Simone started with.",
  },
];

function HowWeGotHere() {
  return (
    <section
      id="how-we-got-here"
      className="bg-base-200 flex items-center py-20"
    >
      <div className="container mx-auto px-2 md:px-0">
        <h2 className="font-display text-center text-2xl font-semibold uppercase lg:text-4xl">
          How We Got Here
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((item) => (
            <div key={item.year}>
              <p className="font-display text-primary text-2xl font-semibold">
                {item.year}
              </p>
              <h3 className="mt-2 font-semibold">{item.title}</h3>
              <p className="text-base-content/70 mt-2 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowWeGotHere;
