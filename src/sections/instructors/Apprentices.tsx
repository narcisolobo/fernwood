import apprentices from "./apprentices-data";
import ApprenticeCard from "./ApprenticeCard";

function Apprentices() {
  return (
    <section id="apprentices" className="bg-base-200 flex items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h2 className="font-display text-center text-2xl font-semibold uppercase lg:text-4xl">
          Apprentice Instructors
        </h2>
        <p className="text-base-content/70 mx-auto mt-4 max-w-[50ch] text-center">
          Training under our lead team, teaching select classes each week.
        </p>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {apprentices.map((apprentice) => (
            <ApprenticeCard key={apprentice.name} {...apprentice} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Apprentices;
