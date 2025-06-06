import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // Criaremos este arquivo

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-press-start-2p" });

export const metadata: Metadata = {
  title: "Fatos sobre Gatos - Curiosidades Felinas",
  description: "Descubra fatos curiosos e interessantes sobre o mundo dos gatos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className='dark'>
      <body className={`${inter.className} ${pressStart2P.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}