//layout renders globally around the whole website
import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar"; //importing navbar 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

// Metadata which are shared globally? 
export const metadata: Metadata = {
  title: "Valorant Tournament",
  description: "Esports tournament platform",
};

//When switching pages navbar/footers dont load again
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-sans antialiased bg-[#0f1923] text-white w-full min-h-screen overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
