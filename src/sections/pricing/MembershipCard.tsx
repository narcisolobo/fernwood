import { type MembershipPlan } from "./Memberships";

function MembershipCard({
  name,
  price,
  priceNote,
  features,
  cta,
  highlighted,
}: MembershipPlan) {
  return (
    <div
      className={`rounded-box flex flex-col p-6 shadow ${
        highlighted
          ? "bg-neutral text-neutral-content"
          : "border-base-300 bg-base-100 border"
      }`}
    >
      <h3 className="font-semibold">{name}</h3>
      <p className="mt-2 text-3xl font-bold">
        {price}
        <span className="text-base font-normal">/mo</span>
      </p>
      <p
        className={`mt-1 text-sm ${
          highlighted ? "text-neutral-content/70" : "text-base-content/60"
        }`}
      >
        {priceNote}
      </p>
      <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button
        className={`btn btn-primary mt-6 w-full ${
          highlighted ? "" : "btn-outline"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

export default MembershipCard;
