export interface Space {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  capacity: number;
  hourlyRate: number;
  amenities: string[];
  images: string[];
  category: string;
}

export const mockSpaces: Space[] = [
  {
    id: "space-001",
    name: "Flexible Coworking Space",
    shortDescription: "Modern workspace with flexible booking options",
    description:
      "Our flexible coworking space offers a modern, comfortable environment with high-speed internet, meeting rooms, and a collaborative atmosphere. Perfect for freelancers, remote workers, and small teams who need a professional workspace without the commitment of a long-term lease.",
    capacity: 20,
    hourlyRate: 93.75, // 750/8hrs
    amenities: [
      "High-speed WiFi",
      "Ergonomic chairs",
      "Standing desks",
      "Coffee machine",
      "Meeting rooms",
      "Whiteboard",
      "TV screen",
      "Phone booth",
      "Kitchenette",
      "Printing facilities",
    ],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    ],
    category: "Coworking",
  },
  {
    id: "space-002",
    name: "Virtual Office",
    shortDescription: "Professional business address with mail handling",
    description:
      "Establish your business presence with our virtual office package. Includes a prestigious business address, mail handling, call forwarding, and access to meeting rooms. Perfect for businesses that need a professional presence without the overhead of a physical office.",
    capacity: 1,
    hourlyRate: 0, // Monthly rate: 7500
    amenities: [
      "Business address",
      "Mail handling",
      "Call forwarding",
      "Meeting room access",
      "Mail scanning",
      "Mail forwarding",
      "Business registration support",
      "Mail storage",
    ],
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094",
    ],
    category: "Virtual",
  },
  {
    id: "space-003",
    name: "Private Office Space",
    shortDescription: "Customizable private office solutions",
    description:
      "Our private office spaces offer complete customization options to match your business needs. Choose from various sizes and configurations, with options for custom branding, dedicated meeting rooms, and exclusive amenities. Perfect for established businesses looking for a professional, private workspace.",
    capacity: 10,
    hourlyRate: 0, // Custom pricing
    amenities: [
      "Custom branding options",
      "Dedicated meeting rooms",
      "Private bathroom",
      "Kitchenette",
      "High-speed WiFi",
      "Climate control",
      "Security system",
      "Mail handling",
      "Reception services",
      "Cleaning services",
    ],
    images: [
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4",
    ],
    category: "Private",
  },
];
