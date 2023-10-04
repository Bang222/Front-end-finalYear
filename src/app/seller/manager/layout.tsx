'use client'
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import LayoutComponent from "@/components/layoutComponent";
import React from "react";


export default function RootLayout({children,}: { children: React.ReactNode },props) {
    const isAuth = useSelector((state) => state.auth.value?.isAuth)
    const router = useRouter()
    return isAuth ? (
        <LayoutComponent role="seller"> {/* Nest children within LayoutComponent */}
            {children}
        </LayoutComponent>
    ) : (
        (() => {
            router.push('/not-found'); // Redirect to the not-found page
            return null; // Return null if you use router.push to avoid rendering children
        })()
    );

}
