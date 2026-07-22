"use client";

import { useAuth } from "@/hooks/useAuth";
import { Fragment, useRef } from "react";
import CancelBookingModal from "./CancelBookingModal";
import JoinButtonModal from "./JoinButtonModal";

interface JoinButtonProps {
  name: string;
  classId: string;
  teacher: string;
  status: "open" | "full";
  myStatus: "booked" | "waitlisted" | null;
  date: Date;
  defaultName: string | null;
  hasEnded: boolean;
  className?: string;
}

function JoinButton({
  name,
  classId,
  teacher,
  status,
  myStatus,
  date,
  defaultName,
  hasEnded,
  className = "",
}: JoinButtonProps) {
  const { session, loading: authLoading } = useAuth();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const disabled = authLoading || !session;

  if (hasEnded) {
    return (
      <button
        className={`btn btn-neutral btn-sm btn-soft whitespace-nowrap ${className}`}
        disabled
        aria-disabled="true"
        suppressHydrationWarning
      >
        Class ended
      </button>
    );
  }

  if (myStatus) {
    return (
      <Fragment>
        <button
          className={`btn btn-neutral btn-sm btn-soft whitespace-nowrap ${className}`}
          onClick={() => dialogRef.current?.showModal()}
          disabled={disabled}
          aria-disabled={disabled}
          suppressHydrationWarning
        >
          {myStatus === "booked" ? "Cancel Booking" : "Leave Waitlist"}
        </button>
        <CancelBookingModal
          classId={classId}
          name={name}
          date={date}
          myStatus={myStatus}
          dialogRef={dialogRef}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <button
        className={`btn btn-sm btn-soft whitespace-nowrap ${
          status === "open" ? "btn-secondary" : "btn-neutral"
        } ${className}`}
        onClick={() => dialogRef.current?.showModal()}
        disabled={disabled}
        aria-disabled={disabled}
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
        defaultName={defaultName}
      />
    </Fragment>
  );
}

export default JoinButton;
