import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "Enes Efe Tokta – Unity & .NET Developer | Portfolio",
  description: "Software Developer specializing in Unity Game Development and .NET Enterprise Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <link href="/assets/css/styles.css" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${syne.variable} nfx-body`}>
        <Navbar />
        {children}
        <Footer />
        <Script src="/assets/js/particles.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
