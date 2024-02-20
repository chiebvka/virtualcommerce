import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Virtuals Ecommerce",
  description: "Home Tools and Appliances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

          <ClerkProvider>
                <html lang="en" className={inter.className}>
                  <body className="bg-background text-foreground">
                    <main>
                      {children}
                    </main>
                    <Toaster />
                  </body>
                </html>
          </ClerkProvider>
    </>
  );
}
