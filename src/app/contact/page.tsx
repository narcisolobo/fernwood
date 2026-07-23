import FAQ from "@/sections/contact/FAQ";
import ReadyToMove from "@/sections/contact/ReadyToMove";
import VisitUs from "@/sections/contact/VisitUs";
import { Metadata } from "next";

const meta = {
  title: "Contact Us - Fernwood Pilates Studio",
  description:
    "Visit Fernwood Pilates Studio in West Hollywood, right off Santa Monica Blvd. Studio hours, directions, and answers to frequently asked questions.",
};

const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "https://fernwood.narcisolobo.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
};

function ContactPage() {
  return (
    <main className="flex-1">
      <VisitUs />
      <FAQ />
      <ReadyToMove />
    </main>
  );
}

export { metadata };
export default ContactPage;
