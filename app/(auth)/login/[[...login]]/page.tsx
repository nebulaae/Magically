"use client"

import Starfield from 'react-starfield';

import { useTheme } from 'next-themes';
import { Login } from "@/components/pages/auth/Login";

const Page = () => {
    const { theme } = useTheme();

    return (
        <section className="flex-center flex-col min-h-screen">
            <Starfield
                starCount={1000}
                starColor={theme === "dark" ? [255, 255, 255] : [0, 0, 0]}
                speedFactor={0.05}
                backgroundColor={theme === "dark" ? "black" : "white"}
            />
            <Login />
        </section>
    )
}

export default Page;