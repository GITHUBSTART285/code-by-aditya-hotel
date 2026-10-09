"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full border-b border-slate-700 bg-slate-900 text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-wide"
        >
          Aditya Hotel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-amber-400"
          >
            Home
          </Link>

          <Link
            href="/rooms"
            className="text-sm font-medium transition-colors hover:text-amber-400"
          >
            Rooms
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-amber-400"
          >
            About
          </Link>

          <Link
  href="/my-bookings"
  className="text-sm font-medium transition-colors hover:text-amber-400"
>
  My Bookings
</Link>

          <Link
            href="/gallery"
            className="text-sm font-medium transition-colors hover:text-amber-400"
          >
            Gallery
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-amber-400"
          >
            Contact
          </Link>

          <Link
            href="/booking"
            className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="rounded-lg border border-slate-600 px-3 py-2 text-xl md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-700 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={closeMenu}
              className="py-2 text-sm font-medium hover:text-amber-400"
            >
              Home
            </Link>

            <Link
              href="/rooms"
              onClick={closeMenu}
              className="py-2 text-sm font-medium hover:text-amber-400"
            >
              Rooms
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="py-2 text-sm font-medium hover:text-amber-400"
            >
              About
            </Link>
                 <Link
  href="/my-bookings"
  onClick={closeMenu}
  className="py-2 text-sm font-medium hover:text-amber-400"
>
  My Bookings
</Link>
            <Link
              href="/gallery"
              onClick={closeMenu}
              className="py-2 text-sm font-medium hover:text-amber-400"
            >
              Gallery
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="py-2 text-sm font-medium hover:text-amber-400"
            >
              Contact
            </Link>
    
            <Link
              href="/booking"
              onClick={closeMenu}
              className="mt-2 rounded-lg bg-amber-500 px-5 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-amber-400"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}