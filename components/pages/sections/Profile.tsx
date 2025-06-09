import Link from "next/link";
import Image from "next/image";

import { Bolt, User } from "lucide-react";
import { Separator } from "../../ui/separator";
import { useTranslations } from "next-intl";
import { images } from "@/constants";

export const Profile = () => {
    const t = useTranslations("Profile");

    const user = {
        name: "John Doe",
        username: "johndoe",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        avatar: User,
        publications: 17,
        followers: 1,
        following: 3,
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
                        <h1 className="text-lg sm:text-xl font-bold break-words max-w-32 md:max-w-64 lg:max-w-md">{user.name}</h1>
                        <h2 className="text-sm sm:text-base text-muted-foreground break-all">@{user.username}</h2>
                    </div>
                    {/* Avatar */}
                    <div className="flex-end w-full h-full">
                        <div className="flex-center w-16 h-16 rounded-full bg-muted">
                            <user.avatar className="w-8 h-8 text-muted-foreground" />
                        </div>
                    </div>
                </div>
                {/* Bio */}
                <p className="text-xs sm:text-sm text-muted-foreground break-words">{user.bio}</p>
            </div>
            {/* Separator */}
            <Separator className="bg-muted my-4" />
            {/* Stats */}
            <div className="flex-around">
                <div className="flex-column flex-center gap-1 sm:gap-2">
                    <h3 className="text-sm sm:text-base font-semibold">{t("UserInfo.Publications")}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{user.publications}</p>
                </div>
                <div className="flex-column flex-center gap-1 sm:gap-2">
                    <h3 className="text-sm sm:text-base font-semibold">{t("UserInfo.Followers")}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{user.followers}</p>
                </div>
                <div className="flex-column flex-center gap-1 sm:gap-2">
                    <h3 className="text-sm sm:text-base font-semibold">{t("UserInfo.Following")}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{user.following}</p>
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