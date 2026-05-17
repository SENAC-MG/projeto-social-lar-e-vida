import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Lar e Vida",
    description: "Sistema de Gestão Hospitalar com Analytics Integrado",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" className={`h-full ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
            <body className="min-h-full flex flex-col antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
