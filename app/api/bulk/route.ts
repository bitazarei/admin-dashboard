import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  const { ids, role, status } = await request.json();
  const updateData: any = {};
  if (role) updateData.role = role;
  if (status) updateData.status = status;

  await prisma.user.updateMany({
    where: { id: { in: ids } },
    data: updateData,
  });
  return NextResponse.json({ message: "Users updated" });
}

export async function DELETE(request: Request) {
  const { ids } = await request.json();
  await prisma.user.deleteMany({
    where: { id: { in: ids } },
  });
  return NextResponse.json({ message: "Users deleted" });
}