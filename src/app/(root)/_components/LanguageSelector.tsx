"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { Lock, ChevronDown } from "lucide-react";
import Image from "next/image";
import useMounted from "@/hooks/useMounted";

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguage = LANGUAGE_CONFIG[language];

  // These languages are available without signing in
  const FREE_LANGUAGES = ["javascript", "python"];

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

  const handleLanguageSelect = (langId: string) => {
    // Allow selection if user has access or if it's a free language
    if (!hasAccess && !FREE_LANGUAGES.includes(langId)) return;

    setLanguage(langId);
    setIsOpen(false);
  };

  if (!mounted) return null;

  const isCurrentLanguageLocked =
    !hasAccess && !FREE_LANGUAGES.includes(language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-2.5 bg-[#1a1a24] 
        rounded-lg transition-colors
        border border-gray-800/30 hover:bg-[#252532]
        ${isCurrentLanguageLocked ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="size-6 rounded-md bg-gray-800/50 p-0.5">
          <Image
            src={currentLanguage.logoPath}
            alt="programming language logo"
            width={24}
            height={24}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-gray-200 min-w-[80px] text-left">
          {currentLanguage.label}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-64 bg-[#1a1a24]
          rounded-lg border border-gray-800/30 shadow-lg py-2 z-50"
        >
          <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
            <p className="text-xs font-medium text-gray-400">Select Language</p>
          </div>

          <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
            {Object.values(LANGUAGE_CONFIG).map((lang) => {
              const isLocked = !hasAccess && !FREE_LANGUAGES.includes(lang.id);

              return (
                <div key={lang.id} className="relative px-2">
                  <button
                    className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                    ${language === lang.id ? "bg-[#252532] text-blue-400" : "text-gray-300"}
                    ${isLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-[#252532]"}
                  `}
                    onClick={() => handleLanguageSelect(lang.id)}
                    disabled={isLocked}
                  >
                    <div
                      className={`
                      size-8 rounded-lg p-1.5
                      ${language === lang.id ? "bg-blue-500/10" : "bg-gray-800/50"}
                    `}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={lang.logoPath}
                        alt={`${lang.label} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <span className="flex-1 text-left">{lang.label}</span>

                    {isLocked ? (
                      <Lock className="w-4 h-4 text-gray-500" />
                    ) : (
                      language === lang.id && (
                        <div className="w-4 h-4 rounded-full bg-blue-500/30"></div>
                      )
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
