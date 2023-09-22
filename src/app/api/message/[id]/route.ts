import { prisma } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const body = await req.json();
    const data = await prisma.message.update({
      where: {
        id: id,
      },
      data: { title: body },
    });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: 'Щось пішло не так...' }),
      { status: 500 }
    );
  }
};
