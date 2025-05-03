"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useState, useEffect, useRef } from "react";
import { THEMES } from "../_constants";
import {
  Palette,
  CircleOff,
  Moon,
  Sun,
  Github,
  Laptop,
  Cloud,
} from "lucide-react";
import useMounted from "@/hooks/useMounted";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useCodeEditorStore();
  const mounted = useMounted();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 flex items-center gap-2 px-4 py-2.5 bg-[#1a1a24] 
        hover:bg-[#252532] rounded-lg transition-colors border border-gray-800/30"
      >
        <Palette className="w-4 h-4 text-gray-400" />

        <span className="text-gray-300 min-w-[80px] text-left">
          {currentTheme?.label}
        </span>

        <div
          className="relative w-4 h-4 rounded-full border border-gray-700"
          style={{ background: currentTheme?.color }}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-[#1a1a24]
          rounded-lg border border-gray-800/30 shadow-lg py-2 z-50"
        >
          <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
            <p className="text-xs font-medium text-gray-400 px-2">
              Select Theme
            </p>
          </div>

          <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`
                relative w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#252532] transition-colors
                ${theme === t.id ? "bg-[#252532] text-blue-400" : "text-gray-300"}
              `}
                onClick={() => setTheme(t.id)}
              >
                {/* icon */}
                <div
                  className={`
                flex items-center justify-center size-8 rounded-lg
                ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "bg-gray-800/50 text-gray-400"}
                transition-colors
              `}
                >
                  {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
                </div>
                {/* label */}
                <span className="flex-1 text-left">{t.label}</span>

                {/* color indicator */}
                <div
                  className="relative size-4 rounded-full border border-gray-700"
                  style={{ background: t.color }}
                />

                {/* active theme indicator */}
                {theme === t.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/30 rounded-l-lg" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
