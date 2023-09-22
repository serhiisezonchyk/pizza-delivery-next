import { prisma } from '@/db';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  try {
    const products = await prisma.product.findMany({
      where: {
        ...(category ? { catSlug: category } : { isFeatured: true }),
      },
    });
    return new NextResponse(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Щось пішло не так.' }), {
      status: 500,
    });
  }
};

export const POST = async(req:NextRequest) =>{
  const body = await req.json();
  try {
    const product = await prisma.product.create({
      data:body,
    });
    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: 'Щось пішло не так.' }), {
      status: 500,
    });
  }
}
