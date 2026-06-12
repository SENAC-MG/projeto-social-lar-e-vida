import "./globals.css";
import { ThemeProvider } from "@wrksz/themes/next";
import ToastProvider from "./components/ToastProvider";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "Lar e Vida",
    description: "Sistema de Gestão Hospitalar com Analytics Integrado",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" className="h-full" suppressHydrationWarning>
            <body
                className={plusJakartaSans.className + " min-h-full flex flex-col antialiased"}
                suppressHydrationWarning
            >
                <ThemeProvider storageKey="lar-vida-theme">
                    <ToastProvider />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
