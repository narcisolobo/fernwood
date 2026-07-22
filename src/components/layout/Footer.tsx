import Fern from "@/images/brand/fern.svg";
import Image from "next/image";
import Link from "next/link";

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
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
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
