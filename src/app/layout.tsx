import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import ToasterProvider from "../components/ToasterProvider";
import CrazyCursor from "../components/CrazyCursor";  

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nitin Gupta | React Native Developer",
  description: "3D Neon Portfolio – React Native, Three.js, GSAP, Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{""}
        {/* Motion toggle + preloader */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const key = 'reduce-motion';
                const val = localStorage.getItem(key);
                if (val === '1') document.body.classList.add('reduce-motion');
              } catch {}
            })();`,
          }}
        />
        <ToasterProvider />
        <CrazyCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
