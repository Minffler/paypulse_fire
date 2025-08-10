"use client";

import { Search, Menu } from "lucide-react";
import { UserNav } from "./UserNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MainNav } from "./MainNav";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      <span className="hidden md:inline-block">PayWise AI</span>
    </Link>
  );
}
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex h-full flex-col">
                  <div className="flex h-16 items-center px-6 border-b">
                    <Logo />
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    <MainNav className="flex-col items-start gap-4" linkClassName="w-full" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex">
             <Logo />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="사번, 성명 검색..."
                  className="w-full bg-background md:w-[200px] lg:w-[336px] pl-10"
                />
              </div>
            </form>
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
