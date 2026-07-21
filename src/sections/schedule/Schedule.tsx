import ClassFilterButtons from "./ClassFilterButtons";
import PleaseSignIn from "./PleaseSignIn";

function Schedule() {
  return (
    <section id="schedule" className="flex items-center pt-20">
      <div className="container mx-auto px-2 md:px-0">
        <h1 className="font-display text-center text-4xl font-semibold lg:text-6xl">
          Class Schedule
        </h1>
        <p className="text-base-content/70 mx-auto mt-4 max-w-[50ch] text-center text-lg">
          Reformer and mat classes, every day of the week
        </p>
        <ClassFilterButtons />
        <PleaseSignIn />
      </div>
    </section>
  );
}

export default Schedule;
