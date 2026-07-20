"use client";

import { useState } from "react";
import { supabaseBrowserClient } from "@/lib/supabase/client";

function JoinButton({
  classId,
  status,
}: {
  classId: string;
  status: "open" | "full";
}) {
  const [result, setResult] = useState<"booked" | "waitlisted" | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    const supabase = supabaseBrowserClient();
    // Simple prompt-based capture for the demo — worth replacing with a
    // real modal/form later, but functionally correct for now.
    const name = window.prompt("Your name:");
    if (!name) return;
    const email = window.prompt("Your email:");
    if (!email) return;

    setLoading(true);
    const { data, error } = await supabase.rpc("book_class", {
      p_class_id: classId,
      p_student_name: name,
      p_student_email: email,
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

  return status === "open" ? (
    <button
      className="btn btn-secondary btn-sm btn-soft"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "..." : "Join Class"}
    </button>
  ) : (
    <button
      className="btn btn-neutral btn-sm btn-soft"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "..." : "Join Waitlist"}
    </button>
  );
}

export default JoinButton;
