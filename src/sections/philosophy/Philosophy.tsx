import {
  IconTarget as Target,
  IconLungs as Wind,
  IconWaveSine as Wave,
  IconUsersGroup as Users,
} from "@tabler/icons-react";
import type { IconProps } from "@tabler/icons-react";
import { ComponentType } from "react";
import PhilosophyTile from "./PhilosophyTile";

type PhilosophyColor =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "info"
  | "warning"
  | "success"
  | "error";

interface PhilosophyItem {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
  color: PhilosophyColor;
}

const philosophy: PhilosophyItem[] = [
  {
    icon: Target,
    title: "Precision",
    description: "Controlled, deliberate movement over speed or reps.",
    color: "primary",
  },
  {
    icon: Wind,
    title: "Breath",
    description: "Every cue ties movement back to breath.",
    color: "info",
  },
  {
    icon: Wave,
    title: "Flow",
    description:
      "Seamless transitions designed to keep you present and connected.",
    color: "warning",
  },
  {
    icon: Users,
    title: "Community",
    description: "Small classes, real coaching, no anonymity.",
    color: "success",
  },
];

function Philosophy() {
  return (
    <section
      id="philosophy"
      className="bg-base-200 flex min-h-[70vh] items-center py-4"
    >
      <div className="container mx-auto px-2 md:px-0">
        <h2 className="font-display mb-6 text-center text-3xl font-semibold lg:text-5xl">
          Train with intention.
        </h2>
        <p className="text-center lg:text-lg">
          Every class is built on four core principles guiding every movement,
          every breath, and every stretch.
        </p>
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {philosophy.map((item) => (
            <PhilosophyTile key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { type PhilosophyItem };
export default Philosophy;
