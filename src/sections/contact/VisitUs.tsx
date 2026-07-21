function VisitUs() {
  return (
    <section id="contact" className="flex items-center py-20">
      <div className="container mx-auto px-2 md:px-0">
        <h1 className="font-display text-center text-4xl font-semibold lg:text-6xl">
          Visit Us
        </h1>
        <p className="text-base-content/70 mx-auto mt-4 max-w-[50ch] text-center">
          Right off Santa Monica Blvd in West Hollywood.
        </p>
        <div className="mt-16 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[3fr_2fr]">
          <div className="relative h-64 overflow-hidden rounded-lg lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.187747115364!2d-118.37123379999998!3d34.0903305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2beb8ecf47d51%3A0x5cc27a82131965f4!2s8332%20Santa%20Monica%20Blvd%2C%20West%20Hollywood%2C%20CA%2090069!5e0!3m2!1sen!2sus!4v1784184466785!5m2!1sen!2sus"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Fernwood studio location"
            />
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-accent text-xs font-semibold tracking-wide uppercase">
                Address
              </h2>
              <p className="mt-2 font-semibold">8332 Santa Monica Blvd</p>
              <p>West Hollywood, CA 90069</p>
              <p className="text-base-content/70 mt-2 text-sm">
                Street parking + validated lot behind the building.
              </p>
            </div>
            <div>
              <h2 className="text-accent text-xs font-semibold tracking-wide uppercase">
                Studio Hours
              </h2>
              <div className="mt-2 flex max-w-xs justify-between">
                <span>Mon – Fri</span>
                <span className="font-semibold">6:00 AM – 7:30 PM</span>
              </div>
              <div className="mt-1 flex max-w-xs justify-between">
                <span>Sat – Sun</span>
                <span className="font-semibold">8:00 AM – 1:00 PM</span>
              </div>
            </div>
            <div>
              <h2 className="text-accent text-xs font-semibold tracking-wide uppercase">
                Contact
              </h2>
              <p className="mt-2 font-semibold">(323) 555-1987</p>
              <p className="font-semibold">hello@neoncorepilates.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisitUs;
