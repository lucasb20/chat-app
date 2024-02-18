import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TokenContextProvider } from "@/services/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raissa",
  description: "A chat application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TokenContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </TokenContextProvider>
  );
}
