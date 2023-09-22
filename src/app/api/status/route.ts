import { prisma } from '@/db';
import { NextResponse } from 'next/server';
export const GET = async () => {
  try {
    const status = await prisma.status.findMany();
    return new NextResponse(JSON.stringify(status), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Щось пішло не так.' }), {
      status: 500,
    });
  }
};
