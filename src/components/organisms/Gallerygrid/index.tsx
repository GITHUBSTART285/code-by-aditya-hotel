"use client";

import { useState } from "react";
import Image from "next/image";

const galleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    title: "Hotel Exterior",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    title: "Luxury Room",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    title: "Swimming Pool",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    title: "Restaurant",
  },
  {
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    title: "Premium Room",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    title: "Hotel Interior",
  },
];

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {galleryImages.map((item) => (
              <div
                key={item.title}
                onClick={() => setSelectedImage(item.image)}
                className="group relative h-60 cursor-pointer overflow-hidden rounded-2xl sm:h-72"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-white sm:text-xl">
                    {item.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Selected gallery image"
              fill
              unoptimized
              className="object-contain"
            />

            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 rounded-full bg-white px-4 py-2 text-xl font-bold text-black"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}