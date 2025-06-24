"use client"

import Link from "next/link";
import Image from "next/image";

import { motion, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";

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

const extractDominantColors = (imgElement: HTMLImageElement): Promise<DominantColors | null> => {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            resolve(null);
            return;
        }

        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(imgElement, 0, 0, 100, 100);

        try {
            const imageData = ctx.getImageData(0, 0, 100, 100);
            const data = imageData.data;
            const colorMap: Record<string, number> = {};

            // Sample more pixels for better accuracy
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const alpha = data[i + 3];

                // Skip transparent pixels
                if (alpha < 128) continue;

                // Skip very dark or very light pixels for better color detection
                const brightness = (r + g + b) / 3;
                if (brightness < 20 || brightness > 240) continue;

                // Less aggressive grouping for more accurate colors
                const key = `${Math.floor(r / 16) * 16},${Math.floor(g / 16) * 16},${Math.floor(b / 16) * 16}`;
                colorMap[key] = (colorMap[key] || 0) + 1;
            }

            const sortedColors = Object.entries(colorMap)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([color]) => {
                    const [r, g, b] = color.split(",").map(Number);
                    // Enhance saturation instead of just brightening
                    const enhanceFactor = 1.2;
                    const enhancedR = Math.min(Math.round(r * enhanceFactor), 255);
                    const enhancedG = Math.min(Math.round(g * enhanceFactor), 255);
                    const enhancedB = Math.min(Math.round(b * enhanceFactor), 255);
                    return `rgb(${enhancedR}, ${enhancedG}, ${enhancedB})`;
                });

            if (sortedColors.length < 3) {
                resolve(null);
                return;
            }

            resolve({
                primary: sortedColors[0],
                secondary: sortedColors[1],
                tertiary: sortedColors[2],
            });
        } catch {
            resolve(null);
        }
    });
};

const blendColors = (colors: DominantColors[]): DominantColors | null => {
    if (colors.length === 0) return null;
    if (colors.length === 1) return colors[0];

    const parseRgb = (rgb: string) => {
        const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
    };

    const blendRgb = (colors: number[][]): string => {
        const avgR = Math.round(colors.reduce((sum, [r]) => sum + r, 0) / colors.length);
        const avgG = Math.round(colors.reduce((sum, [, g]) => sum + g, 0) / colors.length);
        const avgB = Math.round(colors.reduce((sum, [, , b]) => sum + b, 0) / colors.length);
        return `rgb(${avgR}, ${avgG}, ${avgB})`;
    };

    const validColors = colors.map(c => ({
        primary: parseRgb(c.primary),
        secondary: parseRgb(c.secondary),
        tertiary: parseRgb(c.tertiary),
    })).filter(c => c.primary && c.secondary && c.tertiary);

    if (validColors.length === 0) return null;

    return {
        primary: blendRgb(validColors.map(c => c.primary!)),
        secondary: blendRgb(validColors.map(c => c.secondary!)),
        tertiary: blendRgb(validColors.map(c => c.tertiary!)),
    };
};

export const Home = () => {
    const t = useTranslations("Home");
    const { theme } = useTheme();
    const imgRefs = useRef<Record<number, HTMLImageElement | null>>({});
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [imageColors, setImageColors] = useState<Record<number, DominantColors>>({});
    const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
    const [colorUpdateTrigger, setColorUpdateTrigger] = useState(0);

    const currentColors = useMemo(() => {
        const visibleColors = Array.from(visibleImages)
            .map(index => imageColors[index])
            .filter(Boolean);
        return blendColors(visibleColors);
    }, [visibleImages, imageColors, colorUpdateTrigger]);

    const handleImageLoad = useCallback(async (index: number) => {
        const img = imgRefs.current[index];
        if (!img) return;

        try {
            const colors = await extractDominantColors(img);
            if (colors) {
                setImageColors(prev => {
                    const updated = { ...prev, [index]: colors };
                    // Force color update trigger to refresh the blend
                    setColorUpdateTrigger(t => t + 1);
                    return updated;
                });
            }
        } catch (error) {
            console.warn(`Failed to extract colors for image ${index}:`, error);
        }
    }, []);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                setVisibleImages(prev => {
                    const newSet = new Set(prev);
                    entries.forEach(entry => {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        if (entry.isIntersecting) {
                            newSet.add(index);
                        } else {
                            newSet.delete(index);
                        }
                    });
                    return newSet;
                });
            },
            {
                threshold: 0.3,
                rootMargin: '10px'
            }
        );

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        const observer = observerRef.current;
        if (!observer) return;

        Object.values(imgRefs.current).forEach(img => {
            if (img) observer.observe(img);
        });

        return () => {
            Object.values(imgRefs.current).forEach(img => {
                if (img) observer.unobserve(img);
            });
        };
    }, [images]);

    return (
        <>
            {theme === "dark" && currentColors ? (
                <div className="fixed inset-0 -z-10">
                    <motion.div
                        className="absolute inset-0 opacity-50 blur-3xl"
                        style={{
                            background: `
                                radial-gradient(circle at 20% 30%, ${currentColors.primary} 0%, transparent 20%),
                                radial-gradient(circle at 80% 70%, ${currentColors.secondary} 0%, transparent 60%),
                                radial-gradient(circle at 50% 50%, ${currentColors.tertiary} 0%, transparent 60%)
                            `,
                            transition: "background 1s ease"
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                            x: [0, 15, -10, 0],
                            y: [0, -15, 10, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.secondary}, ${currentColors.tertiary})`,
                            transition: "background 1s ease"
                        }}
                    />
                </div>
            ) : (
                <div className="fixed inset-0 -z-10" />
            )}
            <section className="section-flex relative">
                {/* Header */}
                <nav className="flex-between w-full mt-6">
                    {/* Logo */}
                    <h1 className="font-bold">Logo</h1>
                    <div className="flex-row gap-2">
                        {/* Register */}
                        <Link href="/register">
                            <Button variant="outline">{t("Buttons.Register")}</Button>
                        </Link>
                        {/* Login */}
                        <Link href="/login">
                            <Button>{t("Buttons.Login")}</Button>
                        </Link>
                    </div>
                </nav>
                {/* Separator */}
                <Separator className="bg-muted my-4" />
                {/* Title */}
                <h1 className="title-text">{t("Title")}</h1>
                {/* Categories */}
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
                {/* Content */}
                <div className="grid-2-2-1 gap-4">
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
                                    if (el) {
                                        imgRefs.current[index] = el as unknown as HTMLImageElement;
                                        el.setAttribute('data-index', index.toString());
                                    }
                                }}
                                src={image.src}
                                alt={image.title}
                                width={2000}
                                height={2000}
                                className="w-full h-auto rounded-lg object-cover aspect-square"
                                onLoad={() => handleImageLoad(index)}
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