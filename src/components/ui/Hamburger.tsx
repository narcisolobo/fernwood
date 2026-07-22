"use client";

import { useDrawer } from "@/hooks/useDrawer";
import { IconMenu2 } from "@tabler/icons-react";

function Hamburger() {
  const { checkboxRef, triggerRef } = useDrawer();
  const toggleDrawer = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
    }
  };

  return (
    <button
      ref={triggerRef}
      onClick={toggleDrawer}
      aria-label="open sidebar"
      className="btn btn-square btn-ghost drawer-button @[80rem]:hidden"
    >
      <IconMenu2 className="inline-block h-6 w-6 stroke-current" />
    </button>
  );
}

export default Hamburger;
