import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Wedding | Forever Together",
  description: "Join us as we begin our forever. A celebration of love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-cream text-charcoal font-serif">
        {children}
      </body>
    </html>
  );
}
