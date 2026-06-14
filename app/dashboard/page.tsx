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
    <div className="flex flex-col p-10 w-full min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.name || "Admin"}!
        </h1>
        <p className="text-muted-foreground">
          Here is what is happening with your users today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="w-full">
          <StatsCard1
            icon={<Users className="w-8 h-8" />}
            title="Total Users"
            value={totalUser}
          />
        </div>
        <div className="w-full">
          <StatsCard1
            icon={<UserCheck className="w-8 h-8" />}
            title="Active Users"
            value={activeUser}
            change={20.1}
          />
        </div>
        <div className="w-full">
          <StatsCard1
            icon={<Shield className="w-8 h-8" />}
            title="Admins"
            value={adminUser}
            change={5}
          />
        </div>
        <div className="w-full">
          <StatsCard1
            icon={<ShieldAlert className="w-8 h-8" />}
            title="Inactive Users"
            value={inactiveUser}
            change={-1}
          />
        </div>
      </div>
    </div>
  );
}
