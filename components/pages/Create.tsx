import { useTranslations } from "next-intl";

export const Create = () => {
    const t = useTranslations("Create");
    return (
        <section className="flex-column">
            <h1 className="text-3xl font-bold">{t("Title")}</h1>
            <p className="mt-4">You can create your image.</p>
        </section>
    );
};