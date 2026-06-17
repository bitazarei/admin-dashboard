import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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

    return NextResponse.json({
      totalUser,
      activeUser,
      adminUser,
      inactiveUser,
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}