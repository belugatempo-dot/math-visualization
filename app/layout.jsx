import "./globals.css";
import StarField from "@/components/StarField";
import Providers from "@/components/Providers";

export const viewport = {
  themeColor: "#0f172a",
};

export const metadata = {
  title: "Beast Academy 4 - Interactive Math Dashboard",
  description:
    "14 interactive math widgets for Beast Academy Level 4 — shapes, multiplication, exponents, fractions, decimals, probability and more. Bilingual English/Chinese.",
  openGraph: {
    title: "Beast Academy 4 - Interactive Math Dashboard",
    description:
      "14 interactive math widgets covering 12 chapters of Beast Academy Level 4...",
    type: "website",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StarField />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
