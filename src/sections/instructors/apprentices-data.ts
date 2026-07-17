import { StaticImageData } from "next/image";
import JiWoo from "@/images/instructors/ji-woo-kim.png";
import Lusine from "@/images/instructors/lusine-sarkisian.png";

interface ApprenticeItem {
  name: string;
  role: string;
  bio: string;
  photo: StaticImageData;
}

const apprentices: ApprenticeItem[] = [
  {
    name: "Ji-woo Kim",
    role: "Mat Pilates",
    bio: "Completing her 500-hour certification, Ji-woo teaches grounded, breath-led mat classes with a focus on beginners.",
    photo: JiWoo,
  },
  {
    name: "Lusine Sarkisian",
    role: "Reformer Fundamentals",
    bio: "A former competitive gymnast, Lusine brings precise cueing and patience to newer reformer students.",
    photo: Lusine,
  },
];

export { type ApprenticeItem };
export default apprentices;
