"use client"

import Link from "next/link";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/lib/validation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export const Login = () => {
    // Translations
    const t = useTranslations("Auth.Login");

    // Hook form initialization
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            usernameOrEmail: "",
            password: ""
        },
    });

    // Form handler
    const onSubmit = async (values: LoginFormValues) => {
        console.log(values);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="section-flex w-full max-w-sm space-y-4 border p-6 rounded-xl">

                <h1 className="title-text">{t("Title")}</h1>


                <Separator orientation="horizontal" className="bg-muted my-4" />

                {/* Username field */}
                <FormField
                    control={form.control}
                    name="usernameOrEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("UsernameOrEmail")}</FormLabel>
                            <FormControl>
                                <Input placeholder="johndoe, email@example.com..." {...field} />
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
                    <Link className="text-xs underline underline-offset-4 purple-text-hover" href="/register/">
                        {t("Register")}
                    </Link>
                </div>
            </form>
        </Form>
    );
};