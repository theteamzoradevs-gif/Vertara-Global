import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Vertara Global — Build & scale Global Capability Centers in India",
    template: "%s · Vertara Global",
  },
  description:
    "Enterprise GCC advisory and services: talent, workspace, business operations, and research & advisory — one connected system for India capability centers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans" style={{ fontFamily: 'Calibri' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
