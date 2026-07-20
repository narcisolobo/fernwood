"use client";

import { useState } from "react";
import { supabaseBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";

function JoinButton({
  classId,
  status,
}: {
  classId: string;
  status: "open" | "full";
}) {
  const supabase = supabaseBrowserClient();
  const { session, loading: authLoading } = useAuth();
  const [result, setResult] = useState<"booked" | "waitlisted" | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    const name = window.prompt("Your name:");
    if (!name) return;

    setLoading(true);
    const { data, error } = await supabase.rpc("book_class", {
      p_class_id: classId,
      p_student_name: name,
    });
    setLoading(false);

    if (error) {
      console.error(error);
      window.alert("Something went wrong — please try again.");
      return;
    }

    const enrollmentStatus = data?.[0]?.enrollment_status as
      "booked" | "waitlisted";
    setResult(enrollmentStatus);
  }

  if (result === "booked") {
    return (
      <span className="text-secondary text-sm font-semibold">
        You&rsquo;re in!
      </span>
    );
  }
  if (result === "waitlisted") {
    return (
      <span className="text-base-content/60 text-sm font-semibold">
        You&rsquo;re on the waitlist
      </span>
    );
  }

  // Signed-out users can still see the schedule, but the button is
  // disabled rather than clickable-then-erroring — book_class would
  // reject the call anyway (auth.uid() check), this just avoids the
  // pointless round trip and gives a clearer signal up front.
  const disabled = loading || authLoading || !session;

  return status === "open" ? (
    <button
      className="btn btn-secondary btn-sm btn-soft"
      onClick={handleClick}
      disabled={disabled}
    >
      {loading ? "..." : "Join Class"}
    </button>
  ) : (
    <button
      className="btn btn-neutral btn-sm btn-soft"
      onClick={handleClick}
      disabled={disabled}
    >
      {loading ? "..." : "Join Waitlist"}
    </button>
  );
}

export default JoinButton;
