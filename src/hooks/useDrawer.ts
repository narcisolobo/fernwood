"use client";

import { useContext } from "react";
import { DrawerContext } from "@/context/drawer-context";

function useDrawer() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
}

export { useDrawer };
