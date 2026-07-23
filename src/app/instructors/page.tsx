import Apprentices from "@/sections/instructors/Apprentices";
import FindYourMatch from "@/sections/instructors/FindYourMatch";
import LeadInstructors from "@/sections/instructors/LeadInstructors";
import { Metadata } from "next";

const meta = {
  title: "Instructors - Fernwood Pilates Studio",
  description:
    "Visit Fernwood Pilates Studio in West Hollywood, right off Santa Monica Blvd. Studio hours, directions, and answers to frequently asked questions.",
};

const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://fernwood.narcisolobo.com/instructors",
    type: "website",
  },
};

function InstructorsPage() {
  return (
    <main className="flex-1">
      <LeadInstructors />
      <Apprentices />
      <FindYourMatch />
    </main>
  );
}

export { metadata };
export default InstructorsPage;
