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
  title: {
    default: "Nitin Gupta — I build fast, scalable web & mobile apps",
    template: "%s | Nitin Gupta",
  },
  description:
    "I help startups and teams ship fast, scalable web & mobile apps using React Native, Next.js, and TypeScript.",
  keywords: [
    "React Native",
    "React",
    "Next.js",
    "TypeScript",
    "Mobile Apps",
    "Web Apps",
    "Freelance Developer",
    "Frontend Engineer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nitin Gupta — I build fast, scalable web & mobile apps",
    description:
      "I help startups and teams ship fast, scalable web & mobile apps using React Native, Next.js, and TypeScript.",
    url: "/",
    siteName: "Nitin Gupta Portfolio",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Nitin Gupta — React Native & Web Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitin Gupta — I build fast, scalable web & mobile apps",
    description:
      "I help startups and teams ship fast, scalable web & mobile apps using React Native, Next.js, and TypeScript.",
    images: ["/images/hero.png"],
    creator: "@CMNitingupta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#BC13FE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nitin Gupta",
              url: "https://your-domain.com/",
              jobTitle: "React Native Developer",
              email: "mailto:nitincmgupta@email.com",
              sameAs: [
                "https://www.linkedin.com/in/nitinCMgupta/",
                "https://x.com/CMNitingupta",
                "https://www.instagram.com/nitin.shh_"
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Nitin Gupta Portfolio",
              url: "https://your-domain.com/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://your-domain.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
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
