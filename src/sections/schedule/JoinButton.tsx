"use client";

import { useAuth } from "@/hooks/useAuth";
import { Fragment, useRef } from "react";
import JoinButtonModal from "./JoinButtonModal";

interface JoinButtonProps {
  name: string;
  classId: string;
  teacher: string;
  status: "open" | "full";
}

function JoinButton({ name, classId, teacher, status }: JoinButtonProps) {
  const { session, loading: authLoading } = useAuth();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const disabled = authLoading || !session;

  return (
    <Fragment>
      <button
        className={
          status === "open"
            ? "btn btn-secondary btn-sm btn-soft"
            : "btn btn-neutral btn-sm btn-soft"
        }
        onClick={() => dialogRef.current?.showModal()}
        disabled={disabled}
        suppressHydrationWarning
      >
        {status === "open" ? "Join Class" : "Join Waitlist"}
      </button>
      <JoinButtonModal
        classId={classId}
        name={name}
        status={status}
        teacher={teacher}
        dialogRef={dialogRef}
      />
    </Fragment>
  );
}

export default JoinButton;
