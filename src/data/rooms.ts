export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  guests: number;
  amenities: string[];
}

export const rooms: Room[] = [
  {
    id: "1",
    name: "Deluxe Room",
    description:
      "A comfortable room with modern interiors and premium facilities. Perfect for couples and business travelers.",
    price: 4500,
    image: "/room/deluxe-room.jpg",
    guests: 2,
    amenities: ["Free Wi-Fi", "AC", "TV", "Room Service"],
  },

  {
    id: "2",
    name: "Premium Suite",
    description:
      "A spacious suite with elegant interiors and a luxurious atmosphere.",
    price: 6500,
    image: "/room/premium-suite.jpg",
    guests: 3,
    amenities: ["Free Wi-Fi", "AC", "TV", "Mini Bar"],
  },

  {
    id: "3",
    name: "Executive Room",
    description:
      "A stylish room designed for both business and leisure travelers.",
    price: 5500,
    image: "/room/executive-room.jpg",
    guests: 2,
    amenities: ["Free Wi-Fi", "AC", "Work Desk", "TV"],
  },

  {
    id: "4",
    name: "Family Room",
    description:
      "A spacious room designed to provide comfort for the whole family.",
    price: 7000,
    image: "/room/family-room.jpg",
    guests: 4,
    amenities: ["Free Wi-Fi", "AC", "TV", "Extra Bed"],
  },

  {
    id: "5",
    name: "Luxury Suite",
    description:
      "Experience premium comfort with spacious interiors and elegant design.",
    price: 8500,
    image: "/room/luxury-suite.jpg",
    guests: 4,
    amenities: ["Free Wi-Fi", "AC", "TV", "Mini Bar"],
  },

  {
    id: "6",
    name: "Standard Room",
    description:
      "A simple and comfortable room for a relaxing and affordable stay.",
    price: 3500,
    image: "/room/standard-room.jpg",
    guests: 2,
    amenities: ["Free Wi-Fi", "AC", "TV"],
  },
];