import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TicketProvider from "@/context/ticket-tracer-context";
import  { Toaster } from "react-hot-toast";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Biletio",
  description: "Ticket app",
  openGraph: {
    images: [
      {
        url: "/path/to/ticket.png", // Open Graph image dosyasının yolu
        width: 800,
        height: 600,
        alt: "Biletio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TicketProvider>
          <Navbar />

          {children}
          <Toaster/>
        </TicketProvider>
        
      </body>
    </html>
  );
}
