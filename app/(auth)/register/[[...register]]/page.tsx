"use client"

import Starfield from 'react-starfield';

import { useTheme } from 'next-themes';
import { Register } from "@/components/pages/auth/Register";

const Page = () => {
    const { theme } = useTheme();

    return (
        <section className="flex-center flex-col min-h-screen">
            {/* Theme-aware starfield background */}
            <Starfield
                starCount={1000}
                starColor={theme === "dark" ? [255, 255, 255] : [0, 0, 0]}
                speedFactor={0.05}
                backgroundColor={theme === "dark" ? "black" : "white"}
            />
            <Register />
        </section>
    )
}

export default Page;