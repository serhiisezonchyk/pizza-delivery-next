import { prisma } from '@/db';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
export const GET = async () => {
  try {
    const message = await prisma.message.findFirst();
    return new NextResponse(JSON.stringify(message), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Щось пішло не так.' }), {
      status: 500,
    });
  }
};
