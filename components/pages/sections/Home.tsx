"use client"

import Link from "next/link";
import Image from "next/image";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";

import { images } from "@/constants";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

interface DominantColors {
    primary: string;
    secondary: string;
    tertiary: string;
}

const extractDominantColors = (imgElement: HTMLImageElement): Promise<DominantColors> => {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            resolve({
                primary: "rgb(30, 30, 30)",
                secondary: "rgb(60, 60, 60)",
                tertiary: "rgb(40, 40, 40)",
            });
            return;
        }

        canvas.width = 50;
        canvas.height = 50;
        ctx.drawImage(imgElement, 0, 0, 50, 50);

        try {
            const imageData = ctx.getImageData(0, 0, 50, 50);
            const data = imageData.data;
            const colorMap: Record<string, number> = {};

            for (let i = 0; i < data.length; i += 16) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const key = `${Math.floor(r / 32) * 32},${Math.floor(g / 32) * 32},${Math.floor(b / 32) * 32}`;
                colorMap[key] = (colorMap[key] || 0) + 1;
            }

            const sortedColors = Object.entries(colorMap)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([color]) => {
                    const [r, g, b] = color.split(",").map(Number);
                    return `rgb(${Math.min(r + 30, 255)}, ${Math.min(g + 30, 255)}, ${Math.min(b + 30, 255)})`;
                });

            resolve({
                primary: sortedColors[0] || "rgb(30, 30, 30)",
                secondary: sortedColors[1] || "rgb(60, 60, 60)",
                tertiary: sortedColors[2] || "rgb(40, 40, 40)",
            });
        } catch {
            resolve({
                primary: "rgb(30, 30, 30)",
                secondary: "rgb(60, 60, 60)",
                tertiary: "rgb(40, 40, 40)",
            });
        }
    });
};

export const Home = () => {
    const t = useTranslations("Home");
    const { theme } = useTheme();
    const imgRefs = useRef<Record<number, HTMLImageElement | null>>({});
    const [colorQueue, setColorQueue] = useState<DominantColors[]>([]);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    const colorCycle = useMemo(() => {
        if (colorQueue.length === 0) {
            return {
                primary: "rgb(30, 30, 30)",
                secondary: "rgb(60, 60, 60)",
                tertiary: "rgb(40, 40, 40)",
            };
        }
        return colorQueue[currentColorIndex];
    }, [colorQueue, currentColorIndex]);

    const springPrimary = useSpring(colorCycle.primary, { damping: 20, stiffness: 80 });
    const springSecondary = useSpring(colorCycle.secondary, { damping: 20, stiffness: 80 });
    const springTertiary = useSpring(colorCycle.tertiary, { damping: 20, stiffness: 80 });

    const addColorToQueue = async (img: HTMLImageElement) => {
        const colors = await extractDominantColors(img);
        setColorQueue((prev) => [...prev, colors]);
    };

    useEffect(() => {
        images.forEach((_, idx) => {
            const el = imgRefs.current[idx];
            if (el?.complete) addColorToQueue(el);
        });
    }, []);

    useEffect(() => {
        if (colorQueue.length > 1) {
            const interval = setInterval(() => {
                setCurrentColorIndex((prev) => (prev + 1) % colorQueue.length);
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [colorQueue]);

    return (
        <>
            {theme === "dark" ? (
                <div className="fixed inset-0 -z-10">
                    <motion.div
                        className="absolute inset-0 opacity-30 blur-3xl"
                        style={{
                            background: `
                radial-gradient(circle at 20% 30%, ${colorCycle.primary} 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, ${colorCycle.secondary} 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, ${colorCycle.tertiary} 0%, transparent 50%)
              `,
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                            x: [0, 15, -10, 0],
                            y: [0, -15, 10, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            ) : (
                <div className="fixed inset-0 -z-10 bg-neutral-50" />
            )}

            <section className="section-flex relative">
                <nav className="flex-between w-full mt-6">
                    <h1 className="font-bold">Logo</h1>
                    <div className="flex-row gap-2">
                        <Link href="/register">
                            <Button variant="outline">{t("Buttons.Register")}</Button>
                        </Link>
                        <Link href="/login">
                            <Button>{t("Buttons.Login")}</Button>
                        </Link>
                    </div>
                </nav>

                <Separator className="bg-muted my-4" />
                <h1 className="title-text">{t("Title")}</h1>

                <div className="my-4">
                    <div className="w-full max-w-full">
                        <ScrollArea className="w-full max-w-full overflow-hidden">
                            <div className="flex gap-2 py-2 pb-4 w-max">
                                {[
                                    "Portraits",
                                    "Landscapes",
                                    "Abstract",
                                    "Anime",
                                    "Fantasy",
                                    "Sci-Fi",
                                    "Animals",
                                    "Architecture",
                                    "Nature",
                                    "Surreal",
                                    "Pop Art",
                                    "Cyberpunk",
                                    "Minimalist",
                                    "3D Render",
                                    "Cartoon"
                                ].map((category) => (
                                    <Button key={category} variant="outline" className="min-w-max">
                                        {category}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="bg-transparent" />
                        </ScrollArea>
                    </div>
                </div>

                <div className="grid-default gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            className="relative group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Image
                                ref={(el) => {
                                    if (el) imgRefs.current[index] = el as unknown as HTMLImageElement;
                                }}
                                src={image.src}
                                alt={image.title}
                                width={2000}
                                height={2000}
                                className="w-full h-auto rounded-lg object-cover aspect-square"
                                onLoad={() => addColorToQueue(imgRefs.current[index]!)}
                                crossOrigin="anonymous"
                                priority={index < 4}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
};
