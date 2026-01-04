"use client";

import { buttonVariants } from "@saas/ui/components/ui/button";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@saas/ui/components/ui/navigation-menu";
import { NavigationMenu, NavigationMenuList } from "@saas/ui/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@saas/ui/components/ui/sheet";
import { Skeleton } from "@saas/ui/components/ui/skeleton";
import { cn } from "@saas/ui/lib/utils";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";
import { SiSharex } from "react-icons/si";

import { authClient } from "@/lib/auth-client";

interface NavItem {
  label: string;
  href: string;
  items?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Features",
    href: "/features",
    items: [
      { label: "Feature 1", href: "/features/feature-1" },
      { label: "Feature 2", href: "/features/feature-2" },
      { label: "Feature 3", href: "/features/feature-3" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <SiSharex className="size-6 lg:size-8" />
      <span className="textl-lg lg:text-2xl font-medium">Saas Boilerplate</span>
    </Link>
  );
}

export function SiteHeader() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger className="lg:hidden">
                  <LuMenu className="size-6" />
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <Logo />
                  </SheetHeader>
                  <NavigationMenu className="block px-2 max-w-full items-start flex-none">
                    <NavigationMenuList className="flex-wrap flex-col">
                      {navItems.map((item) =>
                        item.items ? (
                          <NavigationMenuItem key={item.label} className="w-full">
                            <NavigationMenuTrigger className="w-full justify-start">{item.label}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="grid gap-4">
                                <li>
                                  {item.items.map((subItem) => (
                                    <NavigationMenuLink
                                      key={subItem.href}
                                      render={
                                        <Link href={subItem.href} className="text-base">
                                          {subItem.label}
                                        </Link>
                                      }
                                    />
                                  ))}
                                </li>
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        ) : (
                          <NavigationMenuItem key={item.label} className="w-full">
                            <NavigationMenuLink
                              render={
                                <Link href={item.href} className="text-base px-4">
                                  {item.label}
                                </Link>
                              }
                            />
                          </NavigationMenuItem>
                        )
                      )}
                    </NavigationMenuList>
                  </NavigationMenu>
                  <div className="flex items-center flex-col mt-4 gap-2 px-4">
                    {isPending ? (
                      <Skeleton className="w-full h-10 rounded-lg" />
                    ) : user ? (
                      <>
                        <Link href="/app/dashboard" className={cn(buttonVariants({ variant: "default" }), "w-full")}>
                          Go to dashboard
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                          Login
                        </Link>
                        <Link href="/signup" className={cn(buttonVariants({ variant: "default" }), "w-full")}>
                          Signup
                        </Link>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              <Logo />
            </div>
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList className="flex-wrap gap-2">
                {navItems.map((item) =>
                  item.items ? (
                    <NavigationMenuItem key={item.label} className="hidden md:block">
                      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-4">
                          <li>
                            {item.items.map((subItem) => (
                              <NavigationMenuLink
                                key={subItem.href}
                                render={
                                  <Link href={subItem.href} className="text-base">
                                    {subItem.label}
                                  </Link>
                                }
                              />
                            ))}
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuLink
                        render={
                          <Link href={item.href} className="text-base">
                            {item.label}
                          </Link>
                        }
                      />
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-2">
            {isPending ? (
              <Skeleton className="w-20 h-8 rounded-lg" />
            ) : user ? (
              <Link href="/app/dashboard" className={cn(buttonVariants({ variant: "default" }))}>
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className={cn(buttonVariants({ variant: "outline" }))}>
                  Login
                </Link>
                <Link href="/signup" className={cn(buttonVariants({ variant: "default" }))}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
