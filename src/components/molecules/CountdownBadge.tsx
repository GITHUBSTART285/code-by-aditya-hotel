interface CountdownBadgeProps {
  expiresAt: number;
  now: number;
}

const pad = (value: number) => String(value).padStart(2, "0");

export default function CountdownBadge({
  expiresAt,
  now,
}: CountdownBadgeProps) {
  const remaining = Math.max(0, expiresAt - now);

  if (remaining === 0) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Expired
      </span>
    );
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const isUrgent = remaining < 60 * 60 * 1000;

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        isUrgent
          ? "bg-red-100 text-red-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      Pay within {pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </span>
  );
}