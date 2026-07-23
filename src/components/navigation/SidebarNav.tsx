"use client";

import { useDrawer } from "@/hooks/useDrawer";
import Link from "next/link";
import SessionStatus from "../ui/SessionStatus";
import { navItems } from "./nav-items";
import { usePathname } from "next/navigation";

function SidebarNav() {
  const { closeDrawer } = useDrawer();
  const pathname = usePathname();

  return (
    <ul className="menu bg-base-200 min-h-full w-80 p-4 text-lg">
      {navItems.map((item) => {
        const isActive = item.href === pathname;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={closeDrawer}
              className={isActive ? "menu-active" : ""}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
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
