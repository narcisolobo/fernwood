"use client";

import { useState } from "react";
import { IconX } from "@tabler/icons-react";

function DemoNotice() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  return (
    <div
      role="note"
      className="alert alert-info alert-soft border-info relative mx-auto mb-4 max-w-80 pb-8"
    >
      <span>
        Fernwood Pilates Studio is a fictional demo site built to showcase web
        development skills. Signing in will send a real magic link to your email
        via Supabase, but no real account, business, or service exists behind
        it.
      </span>
      <button
        className="btn btn-info btn-soft btn-sm btn-circle absolute right-1 bottom-1"
        onClick={() => setIsVisible(false)}
      >
        <IconX size={16} />
      </button>
    </div>
  );
}

export default DemoNotice;
