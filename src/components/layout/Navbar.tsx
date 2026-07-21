import Fern from "@/images/brand/fern.svg";
import Image from "next/image";
import Link from "next/link";
import DesktopNav from "../navigation/DesktopNav";
import Hamburger from "../ui/Hamburger";
import SessionStatus from "../ui/SessionStatus";
import TrackedToMatch from "./TrackedToMatch";

function BookClassButton() {
  return (
    <Link
      href="/schedule"
      className="btn btn-primary btn-lg hidden md:inline-flex"
    >
      Book a Class
    </Link>
  );
}

function Navbar() {
  return (
    <nav className="bg-base-200 flex w-full items-center py-2 shadow">
      <div className="container mx-auto px-2 lg:px-0">
        <div className="flex items-center gap-2">
          <Hamburger />
          <div className="flex-1">
            <Link href="/">
              <div id="brand" className="relative flex items-center gap-1">
                <div className="flex-none">
                  <Image
                    src={Fern}
                    alt="Fernwood Fern Logo"
                    loading="eager"
                    className="hidden md:block"
                  />
                </div>
                <TrackedToMatch
                  reference="Fernwood"
                  target="Pilates Studio"
                  referenceClassName="font-display text-xl leading-4 font-semibold uppercase md:text-2xl"
                  targetClassName="font-sans text-sm font-light uppercase md:text-lg"
                />
              </div>
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <DesktopNav />
          </div>
          <BookClassButton />
          <div className="hidden md:inline-flex">
            <div className="divider divider-horizontal md:flex"></div>
            <SessionStatus />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
