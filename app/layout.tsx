import { Metadata } from "next";
import { RootLayoutProps } from "@/types";
import { Geist, Geist_Mono } from "next/font/google";

import { Container } from "@/components/shared/Container";
import { SmoothCursor } from "@/components/ui/magic/smooth-cursor";

import { getLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProviders } from "./providers/ThemeProviders";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Volshebny Bot",
  description: "Volshebny Bot is a AI powered generation model for generating an images.",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProviders>
              <Container>
                {children}
              </Container>
            <SmoothCursor />
          </ThemeProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};