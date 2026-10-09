import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Free Wi-Fi",
  "Room Service",
  "Restaurant",
  "Swimming Pool",
  "Free Parking",
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Hotel */}
          <div>
            <h2 className="text-2xl font-bold">Aditya Hotel</h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Experience comfort, elegance, and warm hospitality with a
              memorable stay at Aditya Hotel.
            </p>

            <Link
              href="/booking"
              className="mt-6 inline-block rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
            >
              Book Your Stay
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>

            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold">Our Services</h3>

            <ul className="mt-4 space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-sm text-slate-400"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold">Contact Us</h3>

            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
              <p>📍 Gwalior, Madhya Pradesh</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ info@adityahotel.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-800 pt-6 text-center sm:mt-12">
          <p className="text-xs text-slate-500 sm:text-sm">
            © 2026 Aditya Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}