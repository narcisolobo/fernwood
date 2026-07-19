"use client";

import { useRouter, useSearchParams } from "next/navigation";

function ClassFilterButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type");

  function goToType(type: "reformer" | "mat" | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    router.push(`?${params.toString()}`);
  }

  function buttonClass(active: boolean): string {
    return active ? "btn btn-soft btn-primary btn-sm" : "btn btn-soft btn-sm";
  }

  return (
    <div className="mt-8 flex gap-2">
      <button
        className={buttonClass(!currentType)}
        onClick={() => goToType(null)}
      >
        All Classes
      </button>
      <button
        className={buttonClass(currentType === "reformer")}
        onClick={() => goToType("reformer")}
      >
        Reformer
      </button>
      <button
        className={buttonClass(currentType === "mat")}
        onClick={() => goToType("mat")}
      >
        Mat
      </button>
    </div>
  );
}

export default ClassFilterButtons;
