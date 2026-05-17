import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import ToastProvider from "./components/ToastProvider";

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
                    defaultTheme="light"
                    enableSystem={false}
                    storageKey="lar-vida-theme"
                    disableTransitionOnChange
                >
                    <ToastProvider />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
