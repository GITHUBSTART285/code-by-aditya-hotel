import Link from "next/link";

interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function RoomCard({
  id,
  name,
  description,
  price,
  image,
}: RoomCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Room Image */}
      <div className="h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Room Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-slate-900">
          {name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {description}
        </p>

        {/* Price + Button */}
        <div className="mt-auto flex items-center justify-between pt-5">
          <div>
            <span className="text-xl font-bold text-slate-900">
              ₹{price.toLocaleString("en-IN")}
            </span>

            <span className="ml-1 text-sm text-slate-500">
              / night
            </span>
          </div>

          <Link
            href={`/rooms/${id}`}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-slate-900"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}