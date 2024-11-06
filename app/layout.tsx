"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FileErrorWarning from "./@file_error_warning/page";
import "./globals.css";
import { useState } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body>
          {children}

          <FileErrorWarning />
        </body>
      </html>
    </QueryClientProvider>
  );
}
