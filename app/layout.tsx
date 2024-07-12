import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CardContext";
import React from "react";
import ReactQueryProvider from "@/components/atom/ReactQueryProvider/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header } from "@/components/molecules/Header";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Product list with cart | TechVerito",
  description:
    "This is the product list with card assignment from TechVerito and it is built using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body
          className={cn(
            "min-h-screen font-sans antialiased dark overflow-y-scroll",
            fontSans.variable
          )}
        >
          <TooltipProvider>
            <CartProvider>
              <div className="relative z-50 flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
              </div>
            </CartProvider>
            <ReactQueryDevtools />
          </TooltipProvider>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
