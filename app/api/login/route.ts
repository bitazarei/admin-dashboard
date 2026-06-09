import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.role !== "Admin") {
      return NextResponse.json({ error: "Access denied. Admins only." }, { status: 403 });
    }

    const { password: _, ...userWithoutPass } = user;

    // ذخیره اطلاعات کاربر در Cookie
    (await cookies()).set("user", JSON.stringify(userWithoutPass), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ user: userWithoutPass });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}