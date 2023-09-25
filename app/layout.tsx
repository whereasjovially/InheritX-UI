"use client";

import "./globals.css";
import { Inter } from "next/font/google";

const Layout = dynamic(() => import("@/components/layout/Layout"), {
  // Do not import in server side
  ssr: false,
});
import Providers from "@/components/providers/Providers";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        }
      </body>
    </html>
  );
}
