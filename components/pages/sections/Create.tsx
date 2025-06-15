import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export const Create = () => {
    const t = useTranslations("Create");

    const options = [
        {
            id: 1,
            title: t("Options.Option1"),
            image: '',
            href: ''
        },
        {
            id: 2,
            title: t("Options.Option2"),
            image: '',
            href: ''
        },
        {
            id: 3,
            title: t("Options.Option3"),
            image: '',
            href: ''
        },
        {
            id: 4,
            title: t("Options.Option4"),
            image: '',
            href: ''
        },
    ]

    return (
        <section className="flex-column">
            {/* Title */}
            <h1 className="title-text my-6">{t("Title")}</h1>
            {/* Creating options */}
            <div className="grid-default gap-4">
                {options.map((option) => (
                    <Link
                        href={option.href}
                        key={option.id}
                    >
                        <Button variant="outline" className="w-full">
                            {option.title}
                        </Button>
                    </Link>
                ))}
            </div>
        </section>
    );
};