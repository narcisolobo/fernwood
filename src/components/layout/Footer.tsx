import Fern from "@/images/brand/fern.svg";
import Image from "next/image";
import Link from "next/link";
import {
  IconBrandTwitterFilled,
  IconBrandYoutubeFilled,
  IconBrandFacebookFilled,
} from "@tabler/icons-react";

function Footer() {
  return (
    <div className="bg-base-300 px-2 md:px-0">
      <div className="container mx-auto">
        <footer className="footer sm:footer-horizontal py-10">
          <aside>
            <div id="brand" className="flex items-center gap-1">
              <Image src={Fern} alt="Fernwood Fern Logo" />
              <p className="font-display flex-1 translate-1.5 text-xl leading-4 font-semibold uppercase lg:text-2xl">
                Fernwood
                <br />
                <span className="font-sans text-lg font-light tracking-wider uppercase">
                  Pilates Studio
                </span>
              </p>
            </div>
            <p>
              <br />
              8332 Santa Monica Blvd,
              <br />
              West Hollywood, CA 90069
            </p>
            <p className="text-base-content/70 max-w-[40ch] text-xs">
              Fernwood is a fictional pilates studio created solely to showcase
              web development skills. It is not a real business and is not
              affiliated with any actual studio, gym, or fitness establishment.
            </p>
          </aside>
          <nav>
            <h3 className="footer-title">Site Map</h3>
            <Link href="/" className="link link-hover">
              Home
            </Link>
            <Link href="/schedule" className="link link-hover">
              Schedule
            </Link>
            <Link href="/pricing" className="link link-hover">
              Pricing
            </Link>
            <Link href="/instructors" className="link link-hover">
              Instructors
            </Link>
            <Link href="/about" className="link link-hover">
              About Us
            </Link>
            <Link href="/contact" className="link link-hover">
              Contact Us
            </Link>
          </nav>
          <div className="flex flex-col gap-6">
            <nav>
              <h3 className="footer-title">Social</h3>
              <div className="grid grid-flow-col gap-4">
                <IconBrandTwitterFilled />
                <IconBrandYoutubeFilled />
                <IconBrandFacebookFilled />
              </div>
            </nav>
            <nav>
              <h3 className="footer-title">Cookies</h3>
              <p className="text-base-content/70 max-w-[40ch] text-xs">
                Fernwood uses cookies only to keep you signed in and your
                booking session active. No analytics or tracking cookies are
                used.
              </p>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
