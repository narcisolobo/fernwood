"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useDrawer } from "@/hooks/useDrawer";
import { ReactNode } from "react";

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
      />
      <div className="drawer-content flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </div>
      <Sidebar />
    </div>
  );
}

export default Drawer;
