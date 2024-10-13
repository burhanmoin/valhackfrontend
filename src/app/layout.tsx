import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";

const inter = Afacad({
  weight: ["400", '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLM Digital Assistant",
  description: "Digital Assistant for Valorant Esports team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body
        className={inter.className}
      >
        {children}
      </body>
    </html>
  );
}
