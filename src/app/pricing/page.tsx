import Memberships from "@/sections/pricing/Memberships";
import PickYourPace from "@/sections/pricing/PickYourPace";
import Pricing from "@/sections/pricing/Pricing";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Pricing",
  description:
    "Drop-in classes, class packs, and memberships for Fernwood Pilates Studio in West Hollywood. No contracts, no hidden fees — pick what fits your schedule.",
};

function PricingPage() {
  return (
    <main className="flex-1">
      <Pricing />
      <Memberships />
      <PickYourPace />
    </main>
  );
}

export { metadata };
export default PricingPage;
