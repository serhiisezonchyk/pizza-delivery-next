import { prisma } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (req:NextRequest,{ params }: { params: { order_id: string } }) => {
  const { order_id } = params;
  console.log("order_id",order_id)
  const order = await prisma.order.findUnique({
    where: {
      id: order_id,
    },
  });
  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100*100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    await prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        intent_id: paymentIntent.id,
      },
    });
    console.log(paymentIntent)
    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'Замовлення не знайдено.' }),
      { status: 400 }
    );
  }
};
