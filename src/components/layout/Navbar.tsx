import Fern from "@/images/brand/fern.svg";
import Image from "next/image";
import Link from "next/link";
import DesktopNav from "../navigation/DesktopNav";
import Hamburger from "../ui/Hamburger";

function Navbar() {
  return (
    <nav className="bg-base-200 flex w-full items-center py-2 shadow">
      <div className="container mx-auto">
        <div className="flex items-center gap-2">
          <Hamburger />
          <div className="flex-1">
            <Link href="/">
              <div id="brand" className="flex items-center gap-1">
                <Image src={Fern} alt="Fernwood Fern Logo" loading="eager" />
                <p className="font-display flex-1 translate-1.5 text-xl leading-4 font-semibold uppercase lg:text-2xl">
                  Fernwood
                  <br />
                  <span className="font-sans text-lg font-light tracking-wider uppercase">
                    Pilates Studio
                  </span>
                </p>
              </div>
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <DesktopNav />
          </div>
          <Link href="/schedule" className="btn btn-primary">
            <span className="lg:hidden">Book</span>
            <span className="hidden lg:inline">Book a Class</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
