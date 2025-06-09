import Image from "next/image";

import { images } from "@/constants";
import { useTranslations } from "next-intl";

export const Library = () => {
    const t = useTranslations("Library");

    return (
        <section>
            {/* Title */}
            <h1 className="title-text my-6">{t("Title")}</h1>
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