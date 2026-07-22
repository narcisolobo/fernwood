"use client";

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconCalendar } from "@tabler/icons-react";
import { toDateParam, fromDateParam, isSameLocalDate } from "@/lib/date-params";

function ScheduleControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const currentDateParam = searchParams.get("date");
  const currentDate = currentDateParam
    ? fromDateParam(currentDateParam)
    : new Date();
  const isCurrentWeek = isSameLocalDate(currentDate, new Date());

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

  function openDatePicker() {
    const input = dateInputRef.current;
    if (!input) return;

    // Fall back to .click() for any browser
    // that hasn't implemented showPicker.
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.click();
    }
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
          disabled={isCurrentWeek}
          aria-disabled={isCurrentWeek}
          suppressHydrationWarning
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

      {/* Icon-only trigger — avoids the native date input's own
          locale-formatted text ("07/21/2026"), which the browser
          renders at a fixed width Tailwind can't shrink without
          clipping it. */}
      <button
        type="button"
        onClick={openDatePicker}
        aria-label="Choose a date"
        className="btn btn-square btn-soft btn-sm"
      >
        <IconCalendar size={18} />
      </button>

      {/* Visually hidden but still real and focusable — sr-only
          rather than display:none, so it stays keyboard/screen-reader
          reachable and .showPicker()/.click() still work on it. */}
      <input
        ref={dateInputRef}
        type="date"
        value={toDateParam(currentDate)}
        onChange={(e) => goToDate(fromDateParam(e.target.value))}
        className="sr-only"
        aria-label="Selected date"
      />
    </div>
  );
}

export default ScheduleControls;
