import { Fragment } from "react/jsx-runtime";
import { navItems } from "./nav-items";
import Link from "next/link";

function DesktopNav() {
  return (
    <Fragment>
      <div className="mr-2 flex items-center gap-2">
        <ul className="menu menu-horizontal menu-lg">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default DesktopNav;
