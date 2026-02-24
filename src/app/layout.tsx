import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "SunoFLO - AI FL Studio Generator", description: "Generate FL Studio projects with AI" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><head><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2526358571112801" crossOrigin="anonymous"></script></head><body className="antialiased">{children}</body></html>
  );
}
