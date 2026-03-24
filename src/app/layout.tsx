import type { Metadata, Viewport } from "next";
import "./globals.css";
import SeoScripts from "@/components/SeoScripts";
import SeoVerificationTags from "@/components/SeoVerificationTags";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a1a',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rankuplus.com"),
  title: {
    default: "RankUp | Agence Marketing Digital N°1 au Maroc — SEO, Ads, Branding à Agadir",
    template: "%s | RankUp",
  },
  description: "RankUp est l'agence marketing digital N°1 au Maroc, spécialisée en SEO, publicité Google Ads, branding et génération de leads à Agadir, Casablanca, Marrakech et Rabat.",
  applicationName: "RankUp",
  authors: [{ name: "RankUp", url: "https://rankuplus.com" }],
  creator: "RankUp",
  publisher: "RankUp",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  // Add your Google Search Console verification code here:
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700;1,800;1,900&family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=Noto+Sans+Arabic:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <SeoVerificationTags />
      </head>
      <body className="antialiased">
        {children}
        <SeoScripts />
      </body>
    </html>
  );
}
