import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";
import { Toaster } from "sonner";
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
    description: "Hospital de Câncer Lar e Vida",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" className={`h-full ${geistSans.variable} ${geistMono.variable}`}>
            <body className="min-h-full flex flex-col antialiased">
                <ToastProvider />
                {children}
            </body>
        </html>
    );
}
