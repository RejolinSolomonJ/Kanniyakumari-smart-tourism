import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/ai/AIAssistant";

export const metadata: Metadata = {
  title: "Kanyakumari Tourism | Government of Tamil Nadu",
  description:
    "Official tourism portal of Kanyakumari district, Tamil Nadu. Explore the Southern Gateway of India — beaches, temples, heritage sites, events, and more. Plan your trip, book tickets, and discover the beauty of where three oceans meet.",
  keywords: [
    "Kanyakumari tourism",
    "Tamil Nadu tourism",
    "Vivekananda Rock Memorial",
    "Thiruvalluvar Statue",
    "Kanyakumari beach",
    "South India travel",
    "Government of Tamil Nadu",
    "heritage tourism India",
  ],
  openGraph: {
    title: "Kanyakumari Tourism | The Southern Gateway of Incredible India",
    description:
      "Official Government of Tamil Nadu tourism portal for Kanyakumari. Where the Bay of Bengal, Indian Ocean, and Arabian Sea converge.",
    siteName: "Kanyakumari Tourism",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <AIAssistant />
        <Footer />
      </body>
    </html>
  );
}
