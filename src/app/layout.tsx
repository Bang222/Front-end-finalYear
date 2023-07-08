import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import QueryClientProvider from "@/components/QueryClientProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Travel Page',
    description: 'Final year of mine',
}
export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <QueryClientProvider>
            <html lang="en">
                <body className={inter.className}>
                     <Navbar/>
                     {children}
                </body>
            </html>
        </QueryClientProvider>
    )
}
