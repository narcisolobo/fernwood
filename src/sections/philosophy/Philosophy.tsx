import {
  IconTarget as Target,
  IconLungs as Wind,
  IconBolt as Bolt,
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
    icon: Bolt,
    title: "Energy",
    description: "Curated playlists that keep the room moving.",
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
    <section id="philosophy" className="flex min-h-[70vh] items-center py-4">
      <div className="container mx-auto px-2 md:px-0">
        <h2 className="font-display mb-6 text-center text-2xl font-semibold uppercase">
          Train with intention
        </h2>
        <p className="text-center">
          Every class is built on four principles behind every rep, every cue,
          every playlist.
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
