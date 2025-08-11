"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import * as React from "react";
import {
  LayoutDashboard,
  Wallet,
  Users,
  Calculator,
  Sparkles,
  ShieldCheck,
  FileUp,
  FileText,
  Building,
  History,
  UserCog,
  SlidersHorizontal
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navItems = [
  { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
  {
    label: "급여관리",
    icon: Wallet,
    subItems: [
      { href: "/payroll/upload", label: "업로드 & 검증", icon: FileUp },
      { href: "/payroll/list", label: "급여대장 목록", icon: FileText },
    ],
  },
  {
    label: "외주인력",
    icon: Users,
    subItems: [
        { href: "/outsourcing/list", label: "계약 목록", icon: FileText },
    ],
  },
  {
    label: "계산기",
    icon: Calculator,
    subItems: [
        { href: "/calculators/insurance", label: "4대보험", icon: Building },
        { href: "/calculators/annual-leave", label: "연차수당", icon: Building },
    ],
  },
  { href: "/ai/insights", label: "AI 인사이트", icon: Sparkles },
  {
    label: "관리자",
    icon: ShieldCheck,
    subItems: [
        { href: "/admin/rates", label: "법정 요율 테이블", icon: SlidersHorizontal },
        { href: "/admin/roles", label: "권한/역할 관리", icon: UserCog },
        { href: "/admin/audit", label: "감사로그", icon: History },
    ],
  },
];

export function MainNav({ className, linkClassName, ...props }: React.HTMLAttributes<HTMLElement> & { linkClassName?: string }) {
  const pathname = usePathname();
  const allSubmenuLabels = navItems.filter(item => item.subItems).map(item => item.label);
  const [openItems, setOpenItems] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    // This code runs only on the client, after hydration.
    // This ensures the server and client render the same initial HTML.
    setOpenItems(allSubmenuLabels);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const isParentActive = (subItems: any[]) => subItems.some(item => pathname.startsWith(item.href));

  return (
    <nav className={cn("flex flex-col space-y-2", className)} {...props}>
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        {navItems.map((item) =>
          item.subItems ? (
            <AccordionItem value={item.label} key={item.label} className="border-b-0">
              <AccordionTrigger className={cn(
                "flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:no-underline",
                isParentActive(item.subItems) ? "text-primary" : "text-muted-foreground",
              )}>
                 <item.icon className="h-5 w-5" />
                 {item.label}
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-0">
                <div className="flex flex-col space-y-1 ml-6 border-l pl-4">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                      pathname.startsWith(subItem.href)
                        ? "text-primary bg-muted"
                        : "text-muted-foreground",
                       linkClassName
                    )}
                  >
                    <subItem.icon className="h-4 w-4" />
                    {subItem.label}
                  </Link>
                ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                pathname.startsWith(item.href)
                  ? "text-primary bg-muted"
                  : "text-muted-foreground",
                 linkClassName
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        )}
      </Accordion>
    </nav>
  );
}
