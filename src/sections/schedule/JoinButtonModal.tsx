"use client";

import { IconUser } from "@tabler/icons-react";
import { Fragment, useActionState, type RefObject } from "react";
import { joinClass, type JoinClassState } from "./join-class-action";

interface JoinButtonModalProps {
  name: string;
  classId: string;
  teacher: string;
  status: "open" | "full";
  dialogRef: RefObject<HTMLDialogElement | null>;
}

function JoinButtonModal({
  classId,
  name,
  teacher,
  status,
  dialogRef,
}: JoinButtonModalProps) {
  const [state, formAction, isPending] = useActionState<
    JoinClassState,
    FormData
  >(joinClass, {});

  const closeModal = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box">
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">{name}</h3>
        <h4 className="text-base-content/60">Instructor: {teacher}</h4>

        {state.status ? (
          <div className="py-4">
            <p
              className={
                state.status === "booked"
                  ? "text-secondary font-semibold"
                  : "text-base-content/60 font-semibold"
              }
            >
              {state.status === "booked"
                ? "You're in!"
                : "You're on the waitlist."}
            </p>
            <button onClick={closeModal} className="btn btn-sm mt-4">
              Close
            </button>
          </div>
        ) : (
          <Fragment>
            <p className="py-4">
              Please fill out the form below to join
              {status === "full" ? " the waitlist for " : " "}
              this class.
            </p>
            <form action={formAction}>
              <input type="hidden" name="classId" value={classId} />
              <label className="input mb-4 w-full">
                <IconUser />
                <input
                  name="name"
                  type="text"
                  className="grow"
                  placeholder="Name"
                  required
                />
              </label>
              {state.error && (
                <p className="text-error mb-2 text-sm">{state.error}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isPending}
                >
                  {isPending ? "Joining..." : "Join"}
                </button>
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </dialog>
  );
}

export default JoinButtonModal;
