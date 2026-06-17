"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { StatsCard1 } from "./StatsCard1";
import { UserCheck, Shield, ShieldAlert, Users } from "lucide-react";

type Stats = {
  totalUser: number;
  activeUser: number;
  adminUser: number;
  inactiveUser: number;
};

export default function DashboardPage() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<Stats>({
    totalUser: 0,
    activeUser: 0,
    adminUser: 0,
    inactiveUser: 0,
  });
  const [loading, setLoading] = useState(true);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/users/stats");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // if (loading) {
  //   return <div className="p-10">Loading...</div>;
  // }

  return (
    <div className="flex flex-col p-10 w-full min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {t.welcome || "Welcome back"}, {user?.name || "Admin"}!
        </h1>
        <p className="text-muted-foreground">
          {t.dashboard?.subtitle ||
            "Here is what is happening with your users today."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <StatsCard1
          icon={<Users className="w-8 h-8" />}
          title={t.dashboard?.totalUsers || "Total Users"}
          value={stats.totalUser.toString()}
        />
        <StatsCard1
          icon={<UserCheck className="w-8 h-8" />}
          title={t.dashboard?.activeUsers || "Active Users"}
          value={stats.activeUser.toString()}
          change={20.1}
        />
        <StatsCard1
          icon={<Shield className="w-8 h-8" />}
          title={t.dashboard?.admins || "Admins"}
          value={stats.adminUser.toString()}
          change={5}
        />
        <StatsCard1
          icon={<ShieldAlert className="w-8 h-8" />}
          title={t.dashboard?.inactiveUsers || "Inactive Users"}
          value={stats.inactiveUser.toString()}
          change={-1}
        />
      </div>
    </div>
  );
}
