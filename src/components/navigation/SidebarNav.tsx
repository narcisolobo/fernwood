"use client";

import { useDrawer } from "@/hooks/useDrawer";
import Link from "next/link";
import SessionStatus from "../ui/SessionStatus";
import { navItems } from "./nav-items";

function SidebarNav() {
  const { closeDrawer } = useDrawer();

  return (
    <ul className="menu bg-base-200 min-h-full w-80 p-4 text-lg">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href} onClick={closeDrawer}>
            {item.label}
          </Link>
        </li>
      ))}
      <li className="w-fit pt-4">
        <Link
          href="/schedule"
          className="btn btn-primary"
          onClick={closeDrawer}
        >
          Book a Class
        </Link>
      </li>
      <div className="divider"></div>
      <li>
        <SessionStatus />
      </li>
    </ul>
  );
}

export default SidebarNav;
