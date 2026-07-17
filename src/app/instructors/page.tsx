import Apprentices from "@/sections/instructors/Apprentices";
import FindYourMatch from "@/sections/instructors/FindYourMatch";
import LeadInstructors from "@/sections/instructors/LeadInstructors";

function InstructorsPage() {
  return (
    <main>
      <LeadInstructors />
      <Apprentices />
      <FindYourMatch />
    </main>
  );
}

export default InstructorsPage;
