"use client"

import Link from "next/link";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ThemeSwitcher } from "@/components/functions/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/functions/LanguageSwitcher";

export const Settings = () => {
    // Hooks
    const t = useTranslations("Settings");
    const router = useRouter();

    // Logout Function
    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
            } else {
                router.push('/')
                router.refresh()
            }
        } catch (err) {
            console.error('Logout Error:', err);
        };
    };

    return (
        <section className="flex-column">
            {/* Back button */}
            <Link href="/profile">
                <Button
                    variant="link"
                    className="link-button"
                >
                    <ChevronLeft />
                    {t("BackToProfile")}
                </Button>
            </Link>
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
            <Separator className="bg-muted my-2" />
            {/* Logout Button */}
            <div className="flex-items-end">
                <Button
                    variant="destructive"
                    className="w-full"
                    onClick={logout}
                >
                    {t("Logout")}
                </Button>
            </div>
        </section>
    );
};