import Image from "next/image";

import { images } from "@/constants";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import { useTranslations } from "next-intl";

export const Home = () => {
    const t = useTranslations("Home");

    return (
        <section className="section-flex">
            {/* Navbar */}
            <nav className="flex-between w-full border-b border-muted pb-4 my-4">
                <h1 className="font-bold">Logo</h1>
                <div className="flex-row gap-2">
                    <Button variant="outline">Sign in</Button>
                    <Button>Log in</Button>
                </div>
            </nav>
            {/* Title */}
            <h1 className="title-text">{t("Title")}</h1>
            {/* Categories */}
            <div className="my-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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