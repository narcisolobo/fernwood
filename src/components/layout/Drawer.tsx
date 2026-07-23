"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useDrawer } from "@/hooks/useDrawer";
import { ReactNode } from "react";
import Author from "./Author";

interface DrawerProps {
  children: ReactNode;
}

function Drawer({ children }: DrawerProps) {
  const { checkboxRef } = useDrawer();

  return (
    <div className="drawer">
      <input
        ref={checkboxRef}
        id="mobile-navigation"
        type="checkbox"
        className="drawer-toggle"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="drawer-content flex min-h-dvh flex-col">
        <Navbar />
        {children}
        <Footer />
        <Author />
      </div>
      <Sidebar />
    </div>
  );
}

export default Drawer;
