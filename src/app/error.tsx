"use client";

import Link from "next/link";
import { useEffect } from "react";
import { IconArrowBackUp, IconRefresh } from "@tabler/icons-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-neutral text-neutral-content flex flex-1 items-center justify-center py-20">
      <section className="text-center">
        <h1 className="font-display mb-6 text-center text-2xl font-semibold lg:text-4xl">
          Something didn&rsquo;t stretch quite right.
        </h1>
        <p className="mb-4">
          Something went wrong on our end — you can try again, or head back to
          Home.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => reset()} className="btn btn-primary">
            <IconRefresh className="mr-2" />
            Try Again
          </button>
          <Link href="/" className="btn btn-primary btn-soft">
            <IconArrowBackUp className="mr-2" />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ErrorPage;
