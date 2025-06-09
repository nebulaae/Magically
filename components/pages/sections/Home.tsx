import Link from "next/link";
import Image from "next/image";

import { images } from "@/constants";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

export const Home = () => {
    const t = useTranslations("Home");

    return (
        <section className="section-flex">
            {/* Navbar */}
            <nav className="flex-between w-full mt-6">
                {/* Logo */}
                <h1 className="font-bold">Logo</h1>
                {/* Auth */}
                <div className="flex-row gap-2">
                    {/* Register */}
                    <Link href="/register">
                        <Button variant="outline">
                            {t("Buttons.Register")}
                        </Button>
                    </Link>
                    {/* Login */}
                    <Link href="/login">
                        <Button>
                            {t("Buttons.Login")}
                        </Button>
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
            <div className="grid-default gap-4">
                {images.map((image, index) => (
                    <Image
                        src={image.src}
                        alt={image.title}
                        key={index}
                        width={2000}
                        height={2000}
                        className="w-full h-auto rounded-lg object-cover aspect-square"
                    />
                ))}
            </div>
        </section>
    );
};