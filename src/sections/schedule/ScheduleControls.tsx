"use client";

import { useRouter, useSearchParams } from "next/navigation";

function toDateParam(date: Date): string {
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

function ScheduleControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDateParam = searchParams.get("date");
  const currentDate = currentDateParam ? new Date(currentDateParam) : new Date();

  function goToDate(date: Date) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", toDateParam(date));
    router.push(`?${params.toString()}`);
  }

  function shiftDay(offset: number) {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + offset);
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
          onClick={() => shiftDay(-1)}
        >
          ‹ Day
        </button>
        <button
          className="btn btn-soft btn-sm join-item whitespace-nowrap"
          onClick={() => shiftDay(1)}
        >
          Day ›
        </button>
      </div>
      <input
        type="date"
        value={toDateParam(currentDate)}
        onChange={(e) => goToDate(new Date(e.target.value))}
        className="input input-bordered input-sm"
      />
    </div>
  );
}

export default ScheduleControls;
