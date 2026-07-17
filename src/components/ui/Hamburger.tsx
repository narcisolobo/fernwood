import { IconMenu2 } from "@tabler/icons-react";

function Hamburger() {
  return (
    <label
      htmlFor="mobile-navigation"
      aria-label="open sidebar"
      className="btn btn-square btn-ghost drawer-button lg:hidden"
    >
      <IconMenu2 className="inline-block h-6 w-6 stroke-current" />
    </label>
  );
}

export default Hamburger;
