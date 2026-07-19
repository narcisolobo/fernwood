import instructors from "./instructors-data";
import InstructorCard from "./InstructorCard";
import Link from "next/link";

function Instructors() {
  return (
    <section id="instructors" className="flex items-center py-12">
      <div className="container mx-auto px-2 md:px-0">
        <h2 className="font-display mb-2 text-2xl font-semibold lg:text-5xl">
          Meet your instructors:
        </h2>
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <p className="mb-2 lg:text-lg">
            Certified, obsessive about form, and genuinely fun to be around.
          </p>
          <Link href="/instructors" className="text-primary">
            All Instructors →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-3">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.name} {...instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Instructors;
