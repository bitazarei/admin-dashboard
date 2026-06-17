"use client";

import { ActiveLink } from "next-app-active-link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Users, House, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const MenuContent = React.memo(
  ({
    pathname,
    onLogout,
    t,
  }: {
    pathname: string;
    onLogout: () => void;
    t: any;
  }) => (
    <div className="flex w-full flex-col h-full">
      <div className="flex flex-col mb-10 items-center justify-between mt-4 px-2">
        <div className="flex p-2 items-center">
          <LayoutDashboard className="w-8 h-8 mr-3" />
          <h1 className="text-[20px]">panel Admin</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="flex">
          <ActiveLink
            href="/dashboard"
            className={`mb-5 flex items-center gap-3 p-2 rounded transition-colors w-full
            ${
              pathname === "/dashboard"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
            activeClassName="bg-blue-100 text-blue-700 dark:bg-gray-500 dark:text-gray-100"
          >
            <House className="w-5 h-5" />
            <span>{t.sidebar?.home || "Home"}</span>
          </ActiveLink>
        </div>

        <span className="flex border-b mb-6 "></span>

        <div className="flex">
          <ActiveLink
            href="/dashboard/users"
            className={`mb-5 flex items-center gap-3 p-2 rounded transition-colors w-full
            ${
              pathname === "/dashboard/users"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
            activeClassName="bg-blue-100 text-blue-700 dark:bg-gray-500 dark:text-gray-100"
          >
            <Users className="w-5 h-5" />
            <span>{t.sidebar?.users || "Users"}</span>
          </ActiveLink>
        </div>
      </div>

      <div className="w-full mt-auto">
        <button
          onClick={onLogout}
          className="flex items-center justify-center w-full py-2 bg-gray-300 text-gray-600 rounded hover:cursor-pointer hover:bg-gray-500 hover:text-white dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-red-400 dark:hover:text-black"
        >
          <div className="flex items-center justify-center">
            <LogOut className="w-4 h-4 mr-2" />
            <p>{t.sidebar?.logout || "Logout"}</p>
          </div>
        </button>
      </div>
    </div>
  ),
);

MenuContent.displayName = "MenuContent";

export default React.memo(function SideBar() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      <div className="md:hidden fixed top-7 right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2 bg-white rounded-md shadow-md dark:bg-gray-900 dark:text-gray-200">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-4">
            <MenuContent pathname={pathname} onLogout={handleLogout} t={t} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex border min-w-[240px] items-center h-screen p-2 flex-col fixed left-0 top-0 z-40 ">
        <MenuContent pathname={pathname} onLogout={handleLogout} t={t} />
      </div>

      <div className="hidden md:block w-[240px]" />
    </>
  );
});
