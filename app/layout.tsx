import type {Metadata} from "next";
import {Inter, IBM_Plex_Serif} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ['latin'], variable: '--font-inter'});
const ibmPlexSerif = IBM_Plex_Serif({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
    title: "Vaultify",
    description: "A secure, modern, and user-friendly digital banking solution for seamless financial management.",
    icons: {
        icon: '/icons/logo.png'
    }
};

// To create a group routing, folder name -> (<folderName>)
// This files is used to provide various details about the data. This is necessary every time you create a new layout/branch

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>{children}</body>
        </html>
    );
}
