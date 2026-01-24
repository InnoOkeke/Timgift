"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

type LogoVariant = "header" | "footer" | "custom" | "dark";

type LogoProps = {
    variant?: LogoVariant;
    className?: string;
    tagline?: string;
};

export default function Logo({
    variant = "header",
    className = "",
    tagline,
}: LogoProps) {
    const { theme } = useTheme();

    const sizeMap: Record<LogoVariant, { icon: number; textSize: string; gap: string }> = {
        header: { icon: 38, textSize: "text-xl", gap: "gap-3" },
        footer: { icon: 32, textSize: "text-lg", gap: "gap-2.5" },
        custom: { icon: 24, textSize: "text-base", gap: "gap-2" },
        dark: { icon: 38, textSize: "text-xl", gap: "gap-3" },
    };

    const config = sizeMap[variant] ?? sizeMap.header;
    // If variant is 'dark', we force the light-mode (green/dark) logo regardless of theme
    const isDark = variant === "dark" ? false : theme === "dark";
    const textColor = variant === "dark" ? "text-zinc-900" : "text-zinc-900 dark:text-white";

    return (
        <div className={`flex items-center select-none ${config.gap} ${className}`}>
            <svg
                width={config.icon}
                height={config.icon}
                viewBox="125 405 210 210"
                className="shrink-0"
                xmlns="http://www.w3.org/2000/svg"
            >
                {isDark ? (
                    // DARK MODE: Green G-Frame + Solid White T
                    <>
                        <path
                            d="M 132.245 506.750 L 132.500 603.500 229.250 603.755 L 326 604.010 326 554.005 L 326 504 293 504 L 260 504 260 518 L 260 532 276 532 L 292 532 292 550 L 292 568 245.500 568 L 199 568 199 536 L 199 504 182.500 504 L 166 504 166 474.500 L 166 445 229 445 L 292 445 292 466.500 L 292 488 309 488 L 326 488 326 449 L 326 410 228.995 410 L 131.990 410 132.245 506.750"
                            fill="#205027"
                        />
                        <path
                            d="M 182 474.500 L 182 488 198.500 488 L 215 488 215 520 L 215 552 229.500 552 L 244 552 244 520 L 244 488 260 488 L 276 488 276 474.500 L 276 461 L 229 461 L 182 461 182 474.500"
                            fill="#FFFFFF"
                        />
                    </>
                ) : (
                    // LIGHT MODE: Green G-Frame with transparent T cutout
                    <path
                        d="M 132.245 506.750 L 132.500 603.500 229.250 603.755 L 326 604.010 326 554.005 L 326 504 293 504 L 260 504 260 518 L 260 532 276 532 L 292 532 292 550 L 292 568 245.500 568 L 199 568 199 536 L 199 504 182.500 504 L 166 504 166 474.500 L 166 445 229 445 L 292 445 292 466.500 L 292 488 309 488 L 326 488 326 449 L 326 410 228.995 410 L 131.990 410 132.245 506.750 M 182 474.500 L 182 488 198.500 488 L 215 488 215 520 L 215 552 229.500 552 L 244 552 244 520 L 244 488 260 488 L 276 488 276 474.500 L 276 461 L 229 461 L 182 461 182 474.500"
                        fill="#205027"
                        fillRule="evenodd"
                    />
                )}
            </svg>

            <div className={`flex flex-col ${tagline ? '-mt-1' : ''}`}>
                <div className={`font-bold tracking-tight ${config.textSize}`}>
                    <span className={`${textColor} uppercase`}>
                        TIMGIFT
                    </span>
                </div>
                {tagline && (
                    <span className={`text-[10px] uppercase tracking-widest font-semibold ${variant === "dark" || !isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {tagline}
                    </span>
                )}
            </div>
        </div>
    );
}
