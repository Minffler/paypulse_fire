"use client";

import { cn } from "@/lib/utils";
import { MainNav } from "./MainNav";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2 font-bold text-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 text-primary"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      <span>PayWise AI</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r bg-card h-screen sticky top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto py-4">
            <MainNav className="px-4" />
        </div>
      </div>
    </aside>
  );
}
