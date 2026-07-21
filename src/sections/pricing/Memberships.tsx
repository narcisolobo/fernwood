import MembershipCard from "./MembershipCard";

interface MembershipPlan {
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const plans: MembershipPlan[] = [
  {
    name: "Core 4",
    price: "$149",
    priceNote: "4 classes per month",
    features: [
      "Rolls over up to 2 unused classes",
      "Member pricing on drop-ins",
      "Cancel anytime",
    ],
    cta: "Join",
  },
  {
    name: "Core Unlimited",
    price: "$249",
    priceNote: "Unlimited classes",
    features: [
      "Unlimited reformer & mat",
      "Book classes 7 days early",
      "2 free guest passes / month",
      "Cancel anytime",
    ],
    cta: "Join",
    highlighted: true,
  },
  {
    name: "Founding Member",
    price: "$219",
    priceNote: "Unlimited · annual commitment",
    features: [
      "Unlimited reformer & mat",
      "Locked-in rate for 12 months",
      "4 free guest passes / month",
    ],
    cta: "Join",
  },
];

function Memberships() {
  return (
    <section id="memberships" className="flex items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h2 className="font-display text-center text-4xl font-semibold lg:text-6xl">
          Memberships
        </h2>
        <p className="text-base-content/70 mx-auto mt-4 max-w-[50ch] text-center text-lg">
          For the ones who show up every week.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <MembershipCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { type MembershipPlan };
export default Memberships;
