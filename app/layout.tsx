import { Inter } from "next/font/google";
import Navbar from "../components/layout/Navbar"; // Adjust if Navbar is in a different folder
import Footer from "../components/Footer";         // Adjust if Footer is in a different folder
import "../app/globals.css";                           // Clear relative path to the same folder

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UBTA Member Portal",
  description: "United Boda Transport SACCO Infrastructure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121318] antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}