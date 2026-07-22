import FAQ from "@/sections/contact/FAQ";
import ReadyToMove from "@/sections/contact/ReadyToMove";
import VisitUs from "@/sections/contact/VisitUs";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Visit Fernwood Pilates Studio in West Hollywood, right off Santa Monica Blvd. Studio hours, directions, and answers to frequently asked questions.",
};

function ContactPage() {
  return (
    <main>
      <VisitUs />
      <FAQ />
      <ReadyToMove />
    </main>
  );
}

export { metadata };
export default ContactPage;
