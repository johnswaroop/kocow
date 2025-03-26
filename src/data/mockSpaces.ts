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
    name: "Executive Suite",
    shortDescription: "Premium workspace with panoramic city views",
    description:
      "Our Executive Suite offers a premium workspace experience with panoramic city views, ergonomic furniture, and a private meeting area. Perfect for executives, small teams, or professionals who need a distraction-free environment with all the amenities of a modern office.",
    capacity: 8,
    hourlyRate: 65,
    amenities: [
      "High-speed WiFi",
      "Ergonomic chairs",
      "Standing desks",
      "Coffee machine",
      "Private bathroom",
      "Whiteboard",
      "TV screen",
      "Phone booth",
    ],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    ],
    category: "Premium",
  },
  {
    id: "space-002",
    name: "Creative Studio",
    shortDescription: "Bright and inspiring space for creative professionals",
    description:
      "The Creative Studio is designed for artists, designers, and creative professionals. With abundant natural light, flexible furniture arrangements, and inspiring decor, this space fosters creativity and collaboration. Includes a mini photography corner and art supplies.",
    capacity: 6,
    hourlyRate: 45,
    amenities: [
      "High-speed WiFi",
      "Art supplies",
      "Adjustable lighting",
      "Coffee bar",
      "Photography corner",
      "Sound system",
      "Project display wall",
    ],
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094",
    ],
    category: "Creative",
  },
  {
    id: "space-003",
    name: "Tech Hub",
    shortDescription: "Modern workspace optimized for tech professionals",
    description:
      "Our Tech Hub is equipped with everything tech professionals need: dual-monitor setups, high-speed internet, device charging stations, and a collaborative coding space. Perfect for developers, IT consultants, and tech startups working on their next big project.",
    capacity: 10,
    hourlyRate: 50,
    amenities: [
      "Gigabit WiFi",
      "Dual-monitor setups",
      "Charging stations",
      "Conference room",
      "Snack bar",
      "3D printer",
      "Gaming lounge",
    ],
    images: [
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4",
    ],
    category: "Tech",
  },
  {
    id: "space-004",
    name: "Conference Room",
    shortDescription: "Professional meeting space for client presentations",
    description:
      "Make a lasting impression with our professional Conference Room. Equipped with a large presentation screen, video conferencing capabilities, and comfortable seating for up to 12 people. Ideal for client meetings, team gatherings, and important presentations.",
    capacity: 12,
    hourlyRate: 75,
    amenities: [
      "4K presentation screen",
      "Video conferencing",
      "Soundproof walls",
      "Water service",
      "Notepads & pens",
      "Climate control",
      "Adjustable lighting",
    ],
    images: [
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4",
      "https://images.unsplash.com/photo-1573167583510-0725164297a9",
      "https://images.unsplash.com/photo-1594122230689-45899d9e6f69",
    ],
    category: "Meetings",
  },
  {
    id: "space-005",
    name: "Quiet Pod",
    shortDescription: "Individual focus space for deep work sessions",
    description:
      "Need uninterrupted focus time? Our Quiet Pod provides the perfect environment for deep work and concentration. This single-person workspace features soundproofing, adjustable lighting, and ergonomic seating to maximize productivity during crucial work sessions.",
    capacity: 1,
    hourlyRate: 25,
    amenities: [
      "Soundproof design",
      "Ergonomic chair",
      "Adjustable desk",
      "Task lighting",
      "Power outlets",
      "Small shelf",
      "Do not disturb indicator",
    ],
    images: [
      "https://images.unsplash.com/photo-1498409785966-ab341407de6e",
      "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159",
      "https://images.unsplash.com/photo-1506377295141-e428b0726af6",
    ],
    category: "Focus",
  },
  {
    id: "space-006",
    name: "Collaboration Zone",
    shortDescription: "Open workspace designed for team collaboration",
    description:
      "Our Collaboration Zone encourages teamwork and innovation with an open layout, flexible furniture, and multiple whiteboard walls. This dynamic space adapts to your team's needs, whether you're brainstorming ideas, planning projects, or working together to solve problems.",
    capacity: 15,
    hourlyRate: 55,
    amenities: [
      "Modular furniture",
      "Whiteboard walls",
      "Large monitors",
      "Breakout areas",
      "Collaboration tools",
      "Refreshment station",
      "Printing station",
    ],
    images: [
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd",
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
    category: "Collaboration",
  },
];
