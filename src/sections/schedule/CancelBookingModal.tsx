"use client";

import { Fragment, useActionState, type RefObject } from "react";
import { formatConfirmationDate } from "@/lib/schedule-format";
import {
  cancelBooking,
  type CancelBookingState,
} from "./cancel-booking-action";

interface CancelBookingModalProps {
  name: string;
  classId: string;
  date: Date;
  myStatus: "booked" | "waitlisted";
  dialogRef: RefObject<HTMLDialogElement | null>;
}

function CancelBookingModal({
  classId,
  name,
  date,
  myStatus,
  dialogRef,
}: CancelBookingModalProps) {
  const [state, formAction, isPending] = useActionState<
    CancelBookingState,
    FormData
  >(cancelBooking, {});

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const action =
    myStatus === "booked"
      ? "cancel your booking for"
      : "leave the waitlist for";

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box">
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">Please Confirm</h3>

        {state.success ? (
          <div className="py-4">
            <p className="text-secondary font-semibold">
              {myStatus === "booked"
                ? "Your booking has been canceled."
                : "You've left the waitlist."}
            </p>
            <button onClick={closeModal} className="btn btn-sm mt-4">
              Close
            </button>
          </div>
        ) : (
          <Fragment>
            <p className="py-4">
              Are you sure you want to {action} {name} on{" "}
              {formatConfirmationDate(date)}?
            </p>
            <form action={formAction}>
              <input type="hidden" name="classId" value={classId} />
              {state.error && (
                <p className="text-error mb-2 text-sm">{state.error}</p>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-error btn-sm"
                  disabled={isPending}
                >
                  {isPending ? "Confirming..." : "Confirm"}
                </button>
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </dialog>
  );
}

export default CancelBookingModal;
