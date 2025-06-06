"use client"

import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/magic/dock";

import {
    HomeIcon,
    Library,
    Search,
    Sparkles,
    UserRound,
} from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { useScreen } from "usehooks-ts";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export const Bottombar = () => {
    const screen = useScreen()
    const pathname = usePathname();
    const t = useTranslations("Navbar");

    // Dock Properties
    const distance = screen?.width && screen.width < 768 ? 0 : 140;
    const magnification = screen?.width && screen.width < 768 ? 0 : 60;

    const bottombarItems = [
        {
            href: "/",
            icon: HomeIcon,
            label: t("Home"),
        },
        {
            href: "/search",
            icon: Search,
            label: t("Search"),
        },
        {
            href: "/create",
            icon: Sparkles,
            label: t("Create"),
        },
        {
            href: "/library",
            icon: Library,
            label: t("Library"),
        },
        {
            href: "/profile",
            icon: UserRound,
            label: t("Profile"),
        },
    ];

    return (
        <div className="fixed bottom-4 left-0 right-0 z-100">
            <TooltipProvider>
                <Dock direction="middle" iconDistance={distance} iconMagnification={magnification}>
                    {bottombarItems.map((item) => (
                        <DockIcon key={item.label}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        aria-label={item.label}
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                            `${pathname === item.href ? "bg-muted" : ""}`,
                                        )}
                                    >
                                        <item.icon className="size-4" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}
                </Dock>
            </TooltipProvider>
        </div>
    );
};