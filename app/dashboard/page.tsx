import { cookies } from "next/headers";
import { StatsCard1 } from "./StatsCard1";
import { UserCheck, Shield, ShieldAlert, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  const totalUser = await prisma.user.count();
  const activeUser = await prisma.user.count({
    where: { status: "Active" },
  });
  const adminUser = await prisma.user.count({
    where: { role: "Admin" },
  });
  const inactiveUser = await prisma.user.count({
    where: { status: "Inactive" },
  });

  return (
    <div className="p-8 flex flex-col w-full justify-center">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name || "Admin"}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your users today.</p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard1
          icon={<Users className="w-8 h-8" />}
          title="Total Users"
          value={totalUser}
        />
        <StatsCard1
          icon={<UserCheck className="w-8 h-8" />}
          title="Active Users"
          value={activeUser}
          change={20.1}
        />
        <StatsCard1
          icon={<Shield className="w-8 h-8" />}
          title="Admins"
          value={adminUser}
          change={5}
        />
        <StatsCard1
          icon={<ShieldAlert className="w-8 h-8" />}
          title="Inactive Users"
          value={inactiveUser}
          change={-1}
        />
      </div>
    </div>
  );
}