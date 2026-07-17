import { navItems } from "./nav-items";

function SidebarNav() {
  return (
    <ul className="menu bg-base-200 min-h-full w-full p-4">
      {navItems.map((item) => (
        <li key={item.href} className="text-lg">
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
      <li className="pt-4">
        <button className="btn btn-primary">Book a Class</button>
      </li>
    </ul>
  );
}

export default SidebarNav;
