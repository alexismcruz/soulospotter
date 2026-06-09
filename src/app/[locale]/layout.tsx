import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import GlobalFlightCTA from "@/components/flights/GlobalFlightCTA";
import ChatWidget from "@/components/chat/ChatWidget";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧭</text></svg>",
    shortcut: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧭</text></svg>",
  },
  title: {
    default: "SouloSpotter — Travel alone. Travel Soulo. Find yourself.",
    template: "%s | SouloSpotter",
  },
  description:
    "The global directory for solo travelers who seek more than a destination. Find the best spots, cafes, coworking spaces, and hidden gems in every city.",
  metadataBase: new URL("https://soulospotter.com"),
  openGraph: {
    siteName: "SouloSpotter",
    type: "website",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-soulo-white text-soulo-dark">
        <NextIntlClientProvider messages={messages}>
          {children}
          <GlobalFlightCTA />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
