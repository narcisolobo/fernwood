import { type PhilosophyItem } from "./Philosophy";

const colorClasses: Record<PhilosophyItem["color"], string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  neutral: "text-neutral",
  info: "text-info",
  warning: "text-warning",
  success: "text-success",
  error: "text-error",
};

const bgColorClasses: Record<PhilosophyItem["color"], string> = {
  primary: "bg-primary/15",
  secondary: "bg-secondary/15",
  accent: "bg-accent/15",
  neutral: "bg-neutral/15",
  info: "bg-info/15",
  warning: "bg-warning/15",
  success: "bg-success/15",
  error: "bg-error/15",
};

function PhilosophyTile({
  icon: Icon,
  title,
  description,
  color,
}: PhilosophyItem) {
  return (
    <div
      className={`flex flex-col items-center gap-2 text-center ${colorClasses[color]}`}
    >
      <div className={`rounded-full p-4 ${bgColorClasses[color]}`}>
        <Icon color="currentColor" />
      </div>
      <h3 className="text-base-content font-semibold">{title}</h3>
      <p className="text-base-content/60 hidden text-sm lg:block">
        {description}
      </p>
    </div>
  );
}

export default PhilosophyTile;
