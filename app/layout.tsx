import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/components/theme";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable}`} suppressHydrationWarning>
      <body className="min-h-full w-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
