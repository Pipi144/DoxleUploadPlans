import "./globals.css";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/Providers/ReactQueryProvider";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Doxle",
  description: "Start your building with Doxle.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};
export default function RootLayout({
  children,
  file_error_warning,
}: Readonly<{
  children: React.ReactNode;
  file_error_warning: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className="scrollbar-thin">
          {children}

          <Toaster />
          {file_error_warning}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
