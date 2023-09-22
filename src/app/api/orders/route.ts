import { prisma } from '@/db';
import { getAuthSession } from '@/utils/auth';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany({
          orderBy:{
            created_at:'desc'
          }
        });
        return new NextResponse(JSON.stringify(orders), {
          status: 200,
        });
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
        orderBy:{
          created_at:'desc'
        }
      });
      return new NextResponse(JSON.stringify(orders), {
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
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'Ви не авторизовані.' }),
      {
        status: 400,
      }
    );
  }
};
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    try {
      const body = await req.json();
      const order = await prisma.order.create({
        data: body,
      });
      return new NextResponse(JSON.stringify(order), {
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
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'Ви не авторизовані.' }),
      {
        status: 400,
      }
    );
  }
};
