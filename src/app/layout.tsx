import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Folkde Group - Landing Page",
  description: "Somos un grupo de desarrolladores apasionados por la tecnología y la innovación. Creamos soluciones digitales que transforman ideas en realidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark" style={{ fontFamily: "'Roboto', sans-serif" }}>
        <div id="main-content" className="main-content-with-footer">
          <Navbar />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
