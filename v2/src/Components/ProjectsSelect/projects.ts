import { StaticImageData } from "next/image";

import MuqtadImage from "@/assets/images/projects/muqtad.png";
import MuqtadMobile from "@/assets/images/projects/muqtad-mobile.png";
import DeliverySetupImage from "@/assets/images/projects/deliverysetup.png";
import DeliverySetupMobile from "@/assets/images/projects/deliverysetup-mobile.png";
import UIMixImage from "@/assets/images/projects/uimix.png";
import MasuroImage from "@/assets/images/projects/masuro.png";
import MasuroMobile from "@/assets/images/projects/masuro-mobile.png";
import AgentsGeImage from "@/assets/images/projects/agentsge.png";
import AgentsGeMobile from "@/assets/images/projects/agentsge-mobile.png";
import TamariImage from "@/assets/images/projects/tamari.jpg";
import MuqtaImage from "@/assets/images/projects/muqta.webp";
import KoraImage from "@/assets/images/projects/kora.png";
import KoraMobile from "@/assets/images/projects/kora-mobile.png";

type Project = {
  title: string;
  slug: string;
  tagline: string;
  tags: string[];
  image: StaticImageData;
  mobileImage?: StaticImageData;
  backgroundColor: string;
  frameColor: string;
  orientation?: "landscape" | "portrait";
  backgroundImage?: string;
  externalLink?: string;
};

export const projects: Project[] = [
  {
    title: "Kora",
    slug: "kora",
    tagline: "AI co-founder for freelancers & agencies",
    tags: ["product", "AI agents", "ops"],
    backgroundColor: "#E8F1FF",
    frameColor: "#2563EB",
    image: KoraImage,
    mobileImage: KoraMobile,
  },
  {
    title: "agents.ge",
    slug: "agentsge",
    tagline: "shared memory for AI coding agents",
    tags: ["product", "dev tool", "open source"],
    backgroundColor: "#FFE8D1",
    frameColor: "#C2925E",
    image: AgentsGeImage,
    mobileImage: AgentsGeMobile,
  },
  {
    title: "Dali Agents",
    slug: "uimix",
    tagline: "wysiwyg for react components",
    tags: ["product", "dev tool", "open source"],
    backgroundColor: "#ECECEC",
    frameColor: "#888888",
    image: UIMixImage,
  },
  {
    title: "Muqta",
    slug: "muqta",
    tagline: "smart shopping companion",
    tags: ["mobile", "e-commerce", "lifestyle"],
    backgroundColor: "#B8DDF7",
    frameColor: "#5E9FD1",
    orientation: "portrait",
    image: MuqtaImage,
  },
  {
    title: "Muqtad",
    slug: "muqtad",
    tagline: "discount aggregator",
    tags: ["brand", "e-commerce"],
    backgroundColor: "#FDFBF7",
    frameColor: "#5E9FD1",
    image: MuqtadImage,
    mobileImage: MuqtadMobile,
  },
  {
    title: "Delivery Setup",
    slug: "deliverysetup",
    tagline: "restaurant delivery, end-to-end",
    tags: ["brand", "foodtech", "service"],
    backgroundColor: "#F4FAE6",
    frameColor: "#94B062",
    image: DeliverySetupImage,
    mobileImage: DeliverySetupMobile,
  },
  {
    title: "Saint King Tamari",
    slug: "tamari",
    tagline: "daily wisdom of the saints",
    tags: ["mobile", "brand", "spiritual"],
    backgroundColor: "#BCC8D8",
    frameColor: "#5E7290",
    orientation: "portrait",
    image: TamariImage,
  },
  {
    title: "Masuro",
    slug: "masuro",
    tagline: "localization & video studio",
    tags: ["brand", "studio", "video"],
    backgroundColor: "#E8C9C9",
    frameColor: "#9B6B6B",
    image: MasuroImage,
    mobileImage: MasuroMobile,
  },
];
