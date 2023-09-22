import { prisma } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (req: NextRequest,{ params }: { params: { intent_id: string } }) => {
  const { intent_id } = params;
  
  try {
    await prisma.order.update({
      where: {
        intent_id: intent_id,
      },
      data: {
        statusTitle: 'Сплачено',
      },
    });
    return new NextResponse(
      JSON.stringify({
        message: 'Замовлення оновлено..',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        message: 'Помилка..',
      }),
      { status: 500 }
    );
  }
};
