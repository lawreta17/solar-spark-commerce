
export type Product = {
  id: number;
  name: string;
  category: "panels" | "batteries" | "inverters" | "accessories";
  price: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  stock: number;
  bestseller: boolean;
  new: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "SolarSpark Pro Panel",
    category: "panels",
    price: 799,
    description: "Our most efficient solar panel with 22% efficiency and sleek black design. Perfect for residential installations with limited roof space.",
    features: [
      "22% efficiency rating",
      "400W power output",
      "Monocrystalline cells",
      "All-black design",
      "Anti-reflective glass coating",
      "25-year performance warranty"
    ],
    specifications: {
      "Dimensions": "1700mm x 1000mm x 35mm",
      "Weight": "18.5kg",
      "Cell Type": "Monocrystalline PERC",
      "Power Output": "400W",
      "Efficiency": "22%",
      "Operating Temperature": "-40°C to +85°C",
      "Maximum System Voltage": "1000V DC"
    },
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    rating: 4.8,
    reviews: 124,
    stock: 50,
    bestseller: true,
    new: false
  },
  {
    id: 2,
    name: "SolarSpark Flex Panel",
    category: "panels",
    price: 599,
    description: "Flexible solar panel ideal for curved surfaces and portable applications. Perfect for RVs, boats, and camping.",
    features: [
      "Flexible up to 30° bend radius",
      "Lightweight design",
      "200W power output",
      "Marine-grade durability",
      "Junction box with MC4 connectors",
      "15-year performance warranty"
    ],
    specifications: {
      "Dimensions": "1100mm x 800mm x 2.5mm",
      "Weight": "4.5kg",
      "Cell Type": "Monocrystalline",
      "Power Output": "200W",
      "Efficiency": "18%",
      "Operating Temperature": "-40°C to +85°C",
      "Maximum System Voltage": "600V DC"
    },
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    rating: 4.5,
    reviews: 89,
    stock: 35,
    bestseller: false,
    new: true
  },
  {
    id: 3,
    name: "PowerWall Home Battery",
    category: "batteries",
    price: 8999,
    description: "High-capacity home battery system for storing solar energy. Powers your home during outages and optimizes energy usage.",
    features: [
      "13.5kWh capacity",
      "7kW peak power output",
      "Indoor/outdoor rated",
      "Integrated inverter and monitoring",
      "Stackable for increased capacity",
      "10-year warranty"
    ],
    specifications: {
      "Dimensions": "1150mm x 755mm x 155mm",
      "Weight": "125kg",
      "Energy Capacity": "13.5kWh",
      "Peak Power Output": "7kW",
      "Operating Temperature": "-20°C to +50°C",
      "Round-trip Efficiency": "90%",
      "Installation": "Wall-mounted, indoor/outdoor"
    },
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    rating: 4.9,
    reviews: 207,
    stock: 15,
    bestseller: true,
    new: false
  },
  {
    id: 4,
    name: "EnergyBox 5000",
    category: "batteries",
    price: 4999,
    description: "Compact battery storage solution for residential solar systems. Ideal for small to medium homes.",
    features: [
      "5kWh capacity",
      "3.5kW continuous power",
      "Sleek, compact design",
      "Mobile app monitoring",
      "Modular and expandable",
      "8-year warranty"
    ],
    specifications: {
      "Dimensions": "600mm x 600mm x 200mm",
      "Weight": "65kg",
      "Energy Capacity": "5kWh",
      "Continuous Power": "3.5kW",
      "Operating Temperature": "-10°C to +45°C",
      "Round-trip Efficiency": "88%",
      "Installation": "Wall-mounted, indoor only"
    },
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    rating: 4.6,
    reviews: 152,
    stock: 22,
    bestseller: false,
    new: true
  },
  {
    id: 5,
    name: "SolarSpark Grid-Tie Inverter",
    category: "inverters",
    price: 1499,
    description: "High-efficiency grid-tie inverter for residential solar panel systems. Converts DC power from solar panels to AC power for home use.",
    features: [
      "5kW rated output",
      "97.5% efficiency",
      "MPPT technology",
      "WiFi monitoring",
      "Low noise operation",
      "10-year warranty"
    ],
    specifications: {
      "Dimensions": "450mm x 380mm x 150mm",
      "Weight": "15kg",
      "Rated Power": "5kW",
      "Maximum Input Voltage": "600V DC",
      "MPPT Voltage Range": "100-550V DC",
      "Efficiency": "97.5%",
      "Cooling": "Natural convection"
    },
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    rating: 4.7,
    reviews: 78,
    stock: 30,
    bestseller: false,
    new: false
  },
  {
    id: 6,
    name: "Solar Panel Mounting Kit",
    category: "accessories",
    price: 199,
    description: "Complete mounting kit for residential solar panel installation. Includes all hardware needed for standard roof installations.",
    features: [
      "Fits most panel sizes",
      "Anodized aluminum rails",
      "Stainless steel hardware",
      "Adjustable tilt angles",
      "Easy installation",
      "15-year warranty"
    ],
    specifications: {
      "Material": "Anodized aluminum, stainless steel",
      "Rail Length": "4 x 2100mm rails",
      "Maximum Load": "60kg per rail",
      "Compatible Panels": "Most 60/72 cell panels",
      "Wind Resistance": "Up to 140 mph",
      "Installation Type": "Pitched roof, flat roof, ground"
    },
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    rating: 4.5,
    reviews: 112,
    stock: 45,
    bestseller: true,
    new: false
  }
];

export const featuredProducts = products.filter(product => 
  product.bestseller || product.new
);

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === "all") return products;
  return products.filter(product => product.category === category);
}
