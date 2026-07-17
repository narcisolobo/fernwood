import Link from "next/link";
import DesktopNav from "../navigation/DesktopNav";
import Hamburger from "../ui/Hamburger";

function Navbar() {
  return (
    <nav className="bg-base-200 flex w-full items-center py-2 shadow">
      <div className="container mx-auto">
        <div className="flex items-center">
          <Hamburger />
          <p
            id="brand"
            className="font-display flex-1 text-xl font-semibold uppercase lg:text-2xl"
          >
            <Link href="/">Neon Core</Link>
          </p>
          <div className="hidden flex-none lg:block">
            <DesktopNav />
          </div>
          <button className="btn btn-primary">
            <span className="lg:hidden">Book</span>
            <span className="hidden lg:inline">Book a Class</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
