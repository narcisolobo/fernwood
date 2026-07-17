import { type PricingPlan } from "./Pricing";

function PricingCard({
  name,
  price,
  priceNote,
  features,
  cta,
  highlighted,
}: PricingPlan) {
  return (
    <div
      className={`rounded-box relative flex flex-col border p-6 shadow ${
        highlighted ? "border-primary border-2" : "border-base-300"
      }`}
    >
      {highlighted && (
        <span className="bg-primary text-primary-content absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold uppercase">
          Most Popular
        </span>
      )}
      <h3
        className={`text-xs font-semibold tracking-wide uppercase ${
          highlighted ? "text-primary" : "text-accent"
        }`}
      >
        {name}
      </h3>
      <p className="mt-2 text-3xl font-bold">{price}</p>
      <p className="text-base-content/60 mt-1 text-sm">{priceNote}</p>
      <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button
        className={`btn mt-6 w-full ${
          highlighted ? "btn-primary" : "btn-outline"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

export default PricingCard;
