import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name, email, role, status } = await request.json();

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { name, email, role, status },
  });
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ message: "User deleted" });
}