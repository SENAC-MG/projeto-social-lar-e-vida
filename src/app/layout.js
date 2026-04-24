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
    title: "Lar e Vida - Dashboard",
    description: "Hospital de Câncer Lar e Vida - Dashboard de Upload",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body className="min-h-full flex flex-col antialiased">
                {children}
            </body>
        </html>
    );
}
