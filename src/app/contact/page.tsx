import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Aditya Hotel",
  description:
    "Get in touch with Aditya Hotel for room bookings, enquiries, support, and more information about your stay.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-400 sm:text-sm">
            Aditya Hotel
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
            Have a question or need help? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-6 lg:grid-cols-3 lg:gap-10">
          {/* Contact Information */}
          <div className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-400 sm:text-sm">
              Get In Touch
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              We Are Here To Help
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
              Contact us for room bookings, general questions, or any
              assistance regarding your stay.
            </p>

            <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-7">
              <div>
                <p className="text-sm font-semibold text-amber-400">
                  Address
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  Gwalior, Madhya Pradesh, India
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-amber-400">
                  Phone
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-amber-400">
                  Email
                </p>
                <p className="mt-2 break-all text-sm leading-6 text-slate-300 sm:text-base">
                  info@adityahotel.com
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-amber-400">
                  Reception
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                  Available 24/7
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg sm:p-6 md:p-8 lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Send Us A Message
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Fill out the form and our team will get back to you.
            </p>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}