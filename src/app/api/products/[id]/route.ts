import { prisma } from '@/db';
import { getAuthSession } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    console.log(product);
    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Щось пішло не так.' }), {
      status: 500,
    });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const session = await getAuthSession();
  if (session?.user.isAdmin)
    try {
      await prisma.product.delete({
        where: {
          id: id,
        },
      });
      return new NextResponse(JSON.stringify('success'), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: 'Щось пішло не так.' }),
        {
          status: 500,
        }
      );
    }
  else
    return new NextResponse(JSON.stringify({ message: 'Permission denied.' }), {
      status: 400,
    });
};
