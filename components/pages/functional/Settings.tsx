import { Separator } from "../../ui/separator";

import { useTranslations } from "next-intl";
import { ThemeSwitcher } from "../../functions/ThemeSwitcher";
import { LanguageSwitcher } from "../../functions/LanguageSwitcher";

export const Settings = () => {
    const t = useTranslations("Settings");

    return (
        <section className="flex-column">
            {/* Title */}
            <h1 className="title-text my-6">{t("Title")}</h1>
            {/* Separator */}
            <Separator className="bg-muted my-2" />
            {/* Language Switch */}
            <div className="flex-between">
                <h2 className="text-base md:text-lg">{t("Language")}</h2>
                <LanguageSwitcher />
            </div>
            {/* Separator */}
            <Separator className="bg-muted my-2" />
            {/* Theme Switch */}
            <div className="flex-between">
                <h2 className="text-base md:text-lg">{t("Theme")}</h2>
                <ThemeSwitcher />
            </div>
        </section>
    );
};