import PricingCard from "./PricingCard";

interface PricingPlan {
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Drop-In",
    price: "$38",
    priceNote: "per class",
    features: [
      "Single reformer or mat class",
      "No commitment",
      "Great for first-timers",
    ],
    cta: "Book a Class",
  },
  {
    name: "5-Class Pack",
    price: "$170",
    priceNote: "$34 per class · expires in 3 months",
    features: [
      "5 reformer or mat classes",
      "Share with a friend",
      "Priority waitlist access",
    ],
    cta: "Buy Pack",
  },
  {
    name: "10-Class Pack",
    price: "$310",
    priceNote: "$31 per class · expires in 6 months",
    features: [
      "10 reformer or mat classes",
      "Share with a friend",
      "Priority waitlist access",
      "1 free guest pass",
    ],
    cta: "Buy Pack",
    highlighted: true,
  },
  {
    name: "20-Class Pack",
    price: "$560",
    priceNote: "$28 per class · expires in 12 months",
    features: [
      "20 reformer or mat classes",
      "Share with a friend",
      "Priority waitlist access",
      "2 free guest passes",
    ],
    cta: "Buy Pack",
  },
];

function Pricing() {
  return (
    <section id="pricing" className="flex items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h1 className="font-display text-center text-4xl font-semibold uppercase lg:text-6xl">
          Pricing
        </h1>
        <p className="text-base-content/70 mx-auto mt-4 max-w-[50ch] text-center">
          No contracts, no hidden fees. Pick what fits your schedule — switch
          anytime.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { type PricingPlan };
export default Pricing;
