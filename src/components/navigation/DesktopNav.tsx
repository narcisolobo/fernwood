"use client";

import { usePathname } from "next/navigation";

import { navItems } from "./nav-items";
import Link from "next/link";

function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="mr-2 flex items-center gap-2">
      <ul className="menu menu-horizontal menu-lg">
        {navItems.map((item) => {
          const isActive = item.href === pathname;
          return (
            <li key={item.href}>
              <Link href={item.href} className={isActive ? "menu-active" : ""}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DesktopNav;
