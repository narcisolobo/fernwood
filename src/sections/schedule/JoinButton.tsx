"use client";

import { useAuth } from "@/hooks/useAuth";
import { Fragment } from "react";
import JoinButtonModal from "./JoinButtonModal";

interface JoinButtonProps {
  name: string;
  classId: string;
  teacher: string;
  status: "open" | "full";
}

function JoinButton({ name, classId, teacher, status }: JoinButtonProps) {
  const { session, loading: authLoading } = useAuth();

  function openModal(classId: string) {
    const modal = document.getElementById(classId) as HTMLDialogElement;
    modal.showModal();
  }

  const disabled = authLoading || !session;

  return status === "open" ? (
    <Fragment>
      <button
        className="btn btn-secondary btn-sm btn-soft"
        onClick={() => openModal(classId)}
        disabled={disabled}
        suppressHydrationWarning
      >
        Join Class
      </button>
      <JoinButtonModal
        classId={classId}
        name={name}
        status={status}
        teacher={teacher}
      />
    </Fragment>
  ) : (
    <Fragment>
      <button
        className="btn btn-neutral btn-sm btn-soft"
        onClick={() => openModal(classId)}
        disabled={disabled}
        suppressHydrationWarning
      >
        Join Waitlist
      </button>
      <JoinButtonModal
        classId={classId}
        name={name}
        status={status}
        teacher={teacher}
      />
    </Fragment>
  );
}

export default JoinButton;
