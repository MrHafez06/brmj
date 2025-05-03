import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Pi, Code2, Sparkles } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import { SignedIn } from "@clerk/nextjs";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative z-10">
      <div
        className="flex items-center lg:justify-between justify-center 
        bg-[#121218] p-4 mb-4 rounded-lg border border-gray-800/30"
      >
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#1a1a24] p-2 rounded-lg border border-gray-800/30">
              <Pi className="size-5 text-gray-400" />
            </div>

            <div className="flex flex-col">
              <span className="block text-base font-medium text-gray-300">
                Brmj (برمج)
              </span>
              <span className="block text-xs text-gray-500 font-medium">
                Online code editor
              </span>
            </div>
          </Link>
          {/* Snippets link commented out
          <nav className="flex items-center space-x-1">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span
                className="text-sm font-medium relative z-10 group-hover:text-white
                 transition-colors"
              >
                Snippets
              </span>
            </Link>
          </nav>
          */}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
          </div>

          {!convexUser?.isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700 
                bg-gray-800/50 hover:bg-gray-800 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-gray-300">Pro</span>
            </Link>
          )}

          <SignedIn>
            <RunButton />
          </SignedIn>

          <div className="pl-3 border-l border-gray-800">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
