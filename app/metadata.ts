import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Pokédex",
    template: "%s | Pokédex",
  },
  description: "A modern Pokédex built with Next.js and PokeAPI",
  keywords: ["pokemon", "pokedex", "nextjs", "react"],
  authors: [{ name: "Leo Ho" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pokedex.tanloi.id.vn",
    siteName: "Pokédex",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pokédex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokédex",
    description: "A modern Pokédex built with Next.js and PokeAPI",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
