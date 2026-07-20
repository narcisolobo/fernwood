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
}

function JoinButton({
  name,
  classId,
  teacher,
  status,
  myStatus,
  date,
}: JoinButtonProps) {
  const { session, loading: authLoading } = useAuth();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const disabled = authLoading || !session;

  if (myStatus) {
    return (
      <Fragment>
        <button
          className="btn btn-neutral btn-sm btn-soft"
          onClick={() => dialogRef.current?.showModal()}
          disabled={disabled}
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
