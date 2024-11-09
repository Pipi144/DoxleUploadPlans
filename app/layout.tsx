"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import { useState } from "react";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no"
          />
        </Head>
        <body className="scrollbar-thin">
          {children}

          <Toaster />
        </body>
      </html>
    </QueryClientProvider>
  );
}
