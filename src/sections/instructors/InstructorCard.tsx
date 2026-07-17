import Image from "next/image";
import { type InstructorItem } from "./instructors-data";

function InstructorCard({ photo, name, role, bio }: InstructorItem) {
  return (
    <article>
      <figure>
        <Image
          src={photo}
          alt={name}
          className="mb-4 rounded-lg"
          width={480}
          height={358}
        />
      </figure>
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <h4 className="text-accent mb-4 text-xs">{role}</h4>
        <p>{bio}</p>
      </div>
    </article>
  );
}

export default InstructorCard;
