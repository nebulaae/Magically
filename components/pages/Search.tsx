import Image from "next/image";

import { Input } from "../ui/input";
import { images } from "@/constants";
import { useTranslations } from "next-intl";

export const Search = () => {
    const t = useTranslations("Search");

    return (
        <section className="flex-column">
            {/* Title */}
            <h1 className="title-text">{t("Title")}</h1>
            {/* Search input */}
            <Input placeholder="Search for images..." className="w-full mt-4" />
            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
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