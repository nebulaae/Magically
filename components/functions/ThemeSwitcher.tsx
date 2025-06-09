"use client"

import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// theme switcher component
export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme || systemTheme;

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, [setTheme]);

    if (!mounted) return null;

    const handleThemeChange = () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme); // Set theme after updating localStorage
    };

    return (
        <Button
            variant="outline"
            onClick={handleThemeChange}
        >
            {currentTheme === 'dark' ? 'Темная тема' : 'Яркая тема'}
        </Button>
    );
};