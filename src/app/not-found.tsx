import Link from "next/link";
import { IconArrowBackUp } from "@tabler/icons-react";

function NotFound() {
  return (
    <main className="bg-neutral text-neutral-content flex flex-1 items-center justify-center py-20">
      <section className="text-center">
        <h1 className="font-display mb-6 text-center text-4xl font-semibold lg:text-6xl">
          This page took a rest day.
        </h1>
        <p className="mb-4">
          The page you&apos;re looking for doesn&apos;t exist — maybe it moved,
          or the link was mistyped.
        </p>
        <Link href="/" className="btn btn-primary">
          <IconArrowBackUp className="mr-2" />
          Back to Home
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
