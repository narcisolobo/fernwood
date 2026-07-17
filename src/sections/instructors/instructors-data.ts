import { StaticImageData } from "next/image";
import Simone from "@/images/instructors/simone-vega.png";
import Devon from "@/images/instructors/devon-cruz.png";
import Mara from "@/images/instructors/mara-ellison.png";

interface InstructorItem {
  name: string;
  role: string;
  bio: string;
  photo: StaticImageData;
}

const instructors: InstructorItem[] = [
  {
    name: "Simone Vega",
    role: "Power Reformer",
    bio: "Simone builds strength from the ground up — controlled, deliberate sessions that leave you steadier than when you walked in.",
    photo: Simone,
  },
  {
    name: "Devon Cruz",
    role: "Mat Pilates & Mobility",
    bio: "Physical therapist turned instructor, focused on alignment, injury prevention, and long-term strength.",
    photo: Devon,
  },
  {
    name: "Mara Ellison",
    role: "Reformer Flow & Sculpt",
    bio: "Former dancer with 8 years teaching reformer. Known for patient, precise cueing and a calm, steady room.",
    photo: Mara,
  },
];

export { type InstructorItem };
export default instructors;
