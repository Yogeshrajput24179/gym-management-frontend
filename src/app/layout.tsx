import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { DataProvider } from "@/context/DataContext"; 

export const metadata: Metadata = {
  title: "Gym Management",
  description: "Gym Management + AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </DataProvider>
      </body>
    </html>
  );
}