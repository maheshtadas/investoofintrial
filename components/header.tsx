"use client";
import Link from "next/link";
import Logo from "@/components/logo";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { useScroll } from "motion/react";
import {
  SignedOut,
  useUser,
  UserButton,
  SignedIn,
  userProfile,
} from "@clerk/nextjs";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const { scrollYProgress } = useScroll();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav
        data-state={menuState && "active"}
        className={cn(
          "w-full border-b transition-colors duration-150",
          (scrolled || menuState) && "bg-background/50 backdrop-blur-3xl"
        )}
      >
        <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-5 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

              {/* MOBILE LOGIN BUTTON — ADDED HERE */}
              <div className="flex items-center gap-3 lg:hidden mr-2">
                <SignedOut>
                  <Button
                    asChild
                    size="sm"
                    className="rounded-xl px-3 py-1 text-base"
                  >
                    <Link href="sign-in">
                      <span className="text-nowrap">Login</span>
                    </Link>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonPopoverCard: "mt-6 ml-7", // Adds margin top to popover itself
                      },
                    }}
                  />
                </SignedIn>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {/* Admin-only Dashboard */}
                  {isAdmin && (
                    <li>
                      <Link
                        href="#link"
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* MOBILE MENU — LOGIN/SIGNUP REMOVED */}
            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              {/* Mobile menu only links */}
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DESKTOP LOGIN + SIGNUP (unchanged) */}
              <SignedOut>
                <div className="hidden lg:flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/sign-in">
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/sign-in">
                      <span>Sign Up</span>
                    </Link>
                  </Button>
                </div>
              </SignedOut>
              {useUser().user && (
                <div className="hidden md:block">
                  <UserButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
