import instructors from "./instructors-data";
import InstructorCard from "./InstructorCard";

function LeadInstructors() {
  return (
    <section id="lead-instructors" className="flex items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h1 className="font-display text-center text-4xl font-semibold lg:text-6xl">
          Instructors
        </h1>
        <p className="text-base-content/70 mx-auto mt-4 max-w-[50ch] text-center text-lg">
          Certified, obsessive about form, and genuinely fun to be around.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.name} {...instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeadInstructors;
