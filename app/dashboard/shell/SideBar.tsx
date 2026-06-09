"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Users, House, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MenuContent = ({ pathname, onLogout }: { pathname: string; onLogout: () => void }) => (
  <div className="flex flex-col h-full">
    <div className="flex mb-10 items-center justify-center mt-4">
      <div className="flex p-2 items-center">
        <LayoutDashboard className="w-8 h-8 mr-3" />
        <h1 className="text-[20px]">panel Admin</h1>
      </div>
    </div>

    <div className="flex-1 w-full">
      <div className="flex">
        <a
          href="/dashboard"
          className={`mb-5 flex items-center gap-3 p-2 rounded transition-colors w-full ${
            pathname === "/dashboard"
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-100"
          }`}
        >
          <House className="w-5 h-5" />
          <span>Home</span>
        </a>
      </div>
      <span className="flex  border-b mb-6"></span>
      <div className="flex">
        <a
          href="/dashboard/users"
          className={`mb-5 flex items-center gap-3 p-2 rounded transition-colors w-full ${
            pathname === "/dashboard/users"
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-100"
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Users</span>
        </a>
      </div>
    </div>

    <div className="w-full mt-auto">
      <button
        onClick={onLogout}
        className="flex items-center justify-center w-full py-2 bg-gray-300 text-gray-600 rounded hover:cursor-pointer hover:bg-gray-500 hover:text-white"
      >
        <div className="flex items-center justify-center">
          <LogOut className="w-4 h-4 mr-2" />
          <p>Logout</p>
        </div>
      </button>
    </div>
  </div>
);

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      {/* منو هامبرگر  */}
      <div className="md:hidden fixed top-7 right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2 bg-white rounded-md shadow-md">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-4 text-gray-600">
            <MenuContent pathname={pathname} onLogout={handleLogout} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex border min-w-[240px] items-center h-screen p-2 flex-col fixed left-0 top-0 bg-white z-40">
        <MenuContent pathname={pathname} onLogout={handleLogout} />
      </div>

      <div className="hidden md:block w-[240px]" />
    </>
  );
}