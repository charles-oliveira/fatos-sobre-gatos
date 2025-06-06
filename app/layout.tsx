import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-press-start-2p" });

export const metadata: Metadata = {
  title: "Curiosidades Felinas - Loja & Quiz sobre Gatos",
  description: "Descubra fatos fascinantes sobre gatos em nossa loja digital e teste seus conhecimentos no quiz interativo!",
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
          <Navbar className="border-b border-purple-200/20">
            <NavbarBrand>
              <Link href="/" className="font-bold text-lg">
                🐱 Curiosidades Felinas
              </Link>
            </NavbarBrand>
            
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link href="/" className="text-foreground hover:text-primary">
                  Quiz
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/produtos" className="text-foreground hover:text-primary">
                  Catálogo
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/fatos/1" className="text-foreground hover:text-primary">
                  Fatos
                </Link>
              </NavbarItem>
            </NavbarContent>
            
            <NavbarContent justify="end">
              <NavbarItem>
                <Button 
                  as={Link} 
                  href="/login" 
                  color="primary" 
                  variant="flat"
                  size="sm"
                >
                  Login
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          {children}
        </Providers>
      </body>
    </html>
  );
}