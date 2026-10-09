import type { Metadata } from "next";
import GalleryGrid from "@/components/organisms/Gallerygrid";

export const metadata: Metadata = {
  title: "Gallery | Aditya Hotel",
  description:
    "Explore the Aditya Hotel gallery featuring our rooms, swimming pool, restaurant, hotel interiors, and beautiful spaces.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-400 sm:text-sm">
            Aditya Hotel
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Our Gallery
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
            Explore our rooms, facilities, restaurant, and beautiful hotel
            spaces.
          </p>
        </div>
      </section>

      <GalleryGrid />
    </main>
  );
}