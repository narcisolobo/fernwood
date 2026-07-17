import { Fragment } from "react/jsx-runtime";
import { navItems } from "./nav-items";

function DesktopNav() {
  return (
    <Fragment>
      <div className="mr-2 flex items-center gap-2">
        <ul className="menu menu-horizontal">
          {navItems.map((item) => (
            <li key={item.href} className="font-sans">
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default DesktopNav;
