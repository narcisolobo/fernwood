import Apprentices from "@/sections/instructors/Apprentices";
import FindYourMatch from "@/sections/instructors/FindYourMatch";
import LeadInstructors from "@/sections/instructors/LeadInstructors";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Instructors",
  description:
    "Meet Fernwood's Reformer and mat Pilates instructors, led by founder Simone Vega, plus a team of apprentices training under her in West Hollywood.",
};

function InstructorsPage() {
  return (
    <main>
      <LeadInstructors />
      <Apprentices />
      <FindYourMatch />
    </main>
  );
}

export { metadata };
export default InstructorsPage;
