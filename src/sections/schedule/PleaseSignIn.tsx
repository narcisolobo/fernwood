"use client";

import { useAuth } from "@/hooks/useAuth";
import { IconAlertSquareRounded } from "@tabler/icons-react";
import Link from "next/link";

function PleaseSignIn() {
  const { session, loading } = useAuth();

  if (loading || session) return null;

  return (
    <div role="alert" className="alert alert-info border-info mt-4">
      <IconAlertSquareRounded />
      <span className="font-semibold">
        Please{" "}
        <Link href="/auth/sign-in" className="link">
          sign in
        </Link>{" "}
        to join a class or view your bookings.
      </span>
    </div>
  );
}

export default PleaseSignIn;
