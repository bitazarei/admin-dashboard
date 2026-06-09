import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt.toISOString(),
  }));
  return NextResponse.json(formattedUsers);
}

export async function POST(request: Request) {
  const { name, email, role, status } = await request.json();
  const newUser = await prisma.user.create({
    data: { name, email, password: "123456", role, status },
  });
  return NextResponse.json(newUser, { status: 201 });
}