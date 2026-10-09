import type { Metadata } from "next";
import HomePage from "./home_page/page";

export const metadata: Metadata = {
  title: "Aditya Hotel | Comfort, Luxury & Warm Hospitality",
  description:
    "Discover comfortable rooms, modern facilities, and warm hospitality at Aditya Hotel.",
};

export default function Page() {
  return <HomePage />;
}