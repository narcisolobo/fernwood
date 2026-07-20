"use client";

import { useRouter, useSearchParams } from "next/navigation";

function toDateParam(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateParam(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // local midnight, not UTC
}

function ScheduleControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDateParam = searchParams.get("date");
  const currentDate = currentDateParam
    ? fromDateParam(currentDateParam)
    : new Date();

  function goToDate(date: Date) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", toDateParam(date));
    router.push(`?${params.toString()}`);
  }

  function shiftWeek(offset: number) {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + offset * 7);
    goToDate(next);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary btn-sm btn-soft"
        onClick={() => goToDate(new Date())}
      >
        Today
      </button>
      <div className="join">
        <button
          className="btn btn-soft btn-sm join-item whitespace-nowrap"
          onClick={() => shiftWeek(-1)}
        >
          ‹ Week
        </button>
        <button
          className="btn btn-soft btn-sm join-item whitespace-nowrap"
          onClick={() => shiftWeek(1)}
        >
          Week ›
        </button>
      </div>
      <input
        type="date"
        value={toDateParam(currentDate)}
        onChange={(e) => goToDate(fromDateParam(e.target.value))}
        className="input input-bordered input-sm"
      />
    </div>
  );
}

export default ScheduleControls;
