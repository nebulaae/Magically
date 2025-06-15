"use client"

import Link from "next/link";
import Image from "next/image";

import { Bolt, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { images } from "@/constants";
import { UserAttributes } from "@/types";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const Profile = () => {
    const t = useTranslations("Profile");

    // User Fetch
    const [user, setUser] = useState<UserAttributes | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getMe = async () => {
            try {
                const response = await fetch('/api/auth/me', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await response.json();
                setUser(data.user);

            } catch (err) {
                console.error('Error fetching current user:', err);
                setError('Failed to fetch user');
            } finally {
                setLoading(false);
            }
        };

        getMe();
    }, []);

    if (loading) {
        return (
            <section className="section-flex">
                <div className="flex-between my-6">
                    <Skeleton className="h-8 w-32 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                </div>
                <Separator className="bg-muted my-4" />
                <div className="flex-column gap-4">
                    <div className="flex-between">
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton className="h-6 w-40 rounded" />
                            <Skeleton className="h-4 w-24 rounded" />
                        </div>
                        <div className="flex-end w-full h-full">
                            <Skeleton className="w-16 h-16 rounded-full" />
                        </div>
                    </div>
                    <Skeleton className="h-4 w-3/4 rounded" />
                </div>
                <Separator className="bg-muted my-4" />
                <div className="flex-around">
                    <div className="flex-column flex-center gap-2">
                        <Skeleton className="h-4 w-16 rounded" />
                        <Skeleton className="h-3 w-8 rounded" />
                    </div>
                    <div className="flex-column flex-center gap-2">
                        <Skeleton className="h-4 w-16 rounded" />
                        <Skeleton className="h-3 w-8 rounded" />
                    </div>
                    <div className="flex-column flex-center gap-2">
                        <Skeleton className="h-4 w-16 rounded" />
                        <Skeleton className="h-3 w-8 rounded" />
                    </div>
                </div>
                <Separator className="bg-muted my-4" />
                <div className="grid-default gap-4">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="w-full aspect-square rounded-lg" />
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section-flex">
                <div className="text-center text-red-500 py-8">
                    {error}
                </div>
            </section>
        );
    }

    return (
        <section className="section-flex">
            {/* Header */}
            <div className="flex-between my-6">
                <h1 className="title-text">{t("Title")}</h1>
                <Link
                    href="/settings"
                    className="ease hover:bg-muted p-2 rounded-md"
                >
                    <Bolt />
                </Link>
            </div>
            {/* Separator */}
            <Separator className="bg-muted my-4" />
            {/* Profile Info */}
            <div className="flex-column gap-4">
                <div className="flex-between">
                    {/* User Info */}
                    <div className="flex flex-col gap-1 sm:gap-2 w-full">
                        <h1 className="text-lg sm:text-xl font-bold break-words max-w-32 md:max-w-64 lg:max-w-md">{user!.fullname}</h1>
                        <h2 className="text-sm sm:text-base text-muted-foreground break-all">@{user!.username}</h2>
                    </div>
                    {/* Avatar */}
                    <div className="flex-end w-full h-full">
                        <div className="flex-center w-16 h-16 rounded-full bg-muted">
                            <User className="w-8 h-8 text-muted-foreground" />
                        </div>
                    </div>
                </div>
                {/* Bio */}
                <p className="text-xs sm:text-sm text-muted-foreground break-words">{user!.bio}</p>
            </div>
            {/* Separator */}
            <Separator className="bg-muted my-4" />
            {/* Stats */}
            <div className="flex-around">
                <div className="flex-column flex-center gap-1 sm:gap-2">
                    <h3 className="text-sm sm:text-base font-semibold">{t("UserInfo.Publications")}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">0</p>
                </div>
                <div className="flex-column flex-center gap-1 sm:gap-2">
                    <h3 className="text-sm sm:text-base font-semibold">{t("UserInfo.Followers")}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">0</p>
                </div>
                <div className="flex-column flex-center gap-1 sm:gap-2">
                    <h3 className="text-sm sm:text-base font-semibold">{t("UserInfo.Following")}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">0</p>
                </div>
            </div>
            {/* Separator */}
            <Separator className="bg-muted my-4" />
            {/* Publications */}
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