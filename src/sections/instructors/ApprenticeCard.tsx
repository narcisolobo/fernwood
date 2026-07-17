import Image from "next/image";
import { type ApprenticeItem } from "./apprentices-data";

function ApprenticeCard({ photo, name, role, bio }: ApprenticeItem) {
  return (
    <article className="bg-base-100 border-base-300 rounded-box border p-6">
      <Image
        src={photo}
        alt={name}
        className="mb-4 rounded-lg"
        width={480}
        height={358}
      />
      <span className="bg-neutral/15 text-neutral mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase">
        Apprentice
      </span>
      <h3 className="text-lg font-semibold">{name}</h3>
      <h4 className="text-accent mb-4 text-xs">{role}</h4>
      <p>{bio}</p>
    </article>
  );
}

export default ApprenticeCard;
