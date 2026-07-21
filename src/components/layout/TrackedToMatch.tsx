"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface TrackedToMatchProps {
  reference: string; // the wider line — e.g. "FERNWOOD"
  target: string; // the line to stretch — e.g. "PILATES STUDIO"
  referenceClassName?: string;
  targetClassName?: string;
}

function TrackedToMatch({
  reference,
  target,
  referenceClassName,
  targetClassName,
}: TrackedToMatchProps) {
  const referenceRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [letterSpacing, setLetterSpacing] = useState(0);

  useLayoutEffect(() => {
    function recalculate() {
      const referenceEl = referenceRef.current;
      const measureEl = measureRef.current;
      if (!referenceEl || !measureEl) return;

      // measureEl is a hidden, unstyled-for-spacing clone — its width
      // is always the target's *natural* width, so there's never a
      // need to imperatively reset anything on the visible element.
      const referenceWidth = referenceEl.getBoundingClientRect().width;
      const naturalTargetWidth = measureEl.getBoundingClientRect().width;
      const gaps = Math.max(target.length - 1, 1);

      const extraPerGap = (referenceWidth - naturalTargetWidth) / gaps;
      setLetterSpacing(extraPerGap);
    }

    recalculate();
    document.fonts?.ready.then(recalculate);

    const observer = new ResizeObserver(recalculate);
    if (referenceRef.current) observer.observe(referenceRef.current);
    return () => observer.disconnect();
  }, [reference, target]);

  return (
    <div className="flex flex-1 translate-1.5 flex-col items-start">
      <span ref={referenceRef} className={referenceClassName}>
        {reference}
      </span>
      <span
        className={targetClassName}
        style={{ letterSpacing: `${letterSpacing}px` }}
      >
        {target}
      </span>
      {/* Invisible measurement-only clone. Not letter-spaced, not
          part of visual layout, exists purely so recalculate() has
          something stable to measure without touching the real
          element's style directly. */}
      <span
        ref={measureRef}
        className={targetClassName}
        aria-hidden="true"
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          letterSpacing: "0px",
          pointerEvents: "none",
        }}
      >
        {target}
      </span>
    </div>
  );
}

export default TrackedToMatch;
