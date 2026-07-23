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
      <h2 className="text-lg font-semibold">{name}</h2>
      <h3 className="text-primary mb-4 text-sm">{role}</h3>
      <p>{bio}</p>
    </article>
  );
}

export default ApprenticeCard;
