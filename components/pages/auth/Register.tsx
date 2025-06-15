"use client"

import Link from "next/link";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/lib/validation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export const Register = () => {
    // Hooks
    const router = useRouter();
    const t = useTranslations("Auth.Register");

    // Hook form initialization
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullname: "",
            username: "",
            email: "",
            bio: "",
            password: ""
        },
    });

    // Form handler
    const onSubmit = async (values: RegisterFormValues) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/')
                router.refresh()
            } else {
                console.error(data.message || "Не удалось авторизоваться. Неверные данные или пароль.");
            }
        } catch (err) {
            console.error("Произошла ошибка. Пожалуйста, попробуйте позже.");
        }

        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="section-flex w-full max-w-sm space-y-4 border p-6 rounded-xl">

                <h1 className="title-text">{t("Title")}</h1>


                <Separator orientation="horizontal" className="bg-muted my-4" />

                {/* Fullname field */}
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("Fullname")}</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Username field */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("Username")}</FormLabel>
                            <FormControl>
                                <Input placeholder="johndoe..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Username field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("Email")}</FormLabel>
                            <FormControl>
                                <Input placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Username field */}
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("Bio")}</FormLabel>
                            <FormControl>
                                <Textarea placeholder="We are people..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("Password")}</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="ABC12345689..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit button */}
                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? t("Button.Sending") : t("Button.Send")}
                </Button>

                <Separator orientation="horizontal" className="bg-secondary my-4" />

                {/* Login redirect */}
                <div className="flex justify-between items-center">
                    <Link className="text-xs underline underline-offset-4 purple-text-hover" href="/login/">
                        {t("Login")}
                    </Link>
                </div>
            </form>
        </Form>
    );
};