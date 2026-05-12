import Navbar from "@/Components/Navbar/Navbar";
import "./globals.css";
import { sansText } from "@/assets/fonts";
import Footer from "@/Components/Footer/Footer";
import Frame from "@/Components/Frame/Frame";
import PageGrain from "@/Components/PageGrain/PageGrain";

export const metadata = {
  title: "Dali Agency",
  description: "WE CRAFT DIGITAL PRODUCTS BUILT ON WEB, MOBILE & BITCOIN.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sansText.className}>
        <PageGrain />
        <Navbar />
        <Frame />
        {children}
        <Footer />
      </body>
    </html>
  );
}
