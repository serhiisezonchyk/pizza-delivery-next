'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import './SuccessPage.scss';
import { useCartStore } from '@/store';
const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {clearCart} = useCartStore();
  const payment_intent = searchParams.get('payment_intent');
  React.useEffect(() => {
    const confirm = async () => {
      try {
        await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
          method: 'PUT',
        });
        clearCart();
        router.push('/orders');
      } catch (error) {
        console.log(error);
      }
    };
    confirm();
  }, [payment_intent, router]);
  return (
    <div className='success-page'>
      <p>Платіж успішний, зачекайте і не закривайте сторінку</p>
    </div>
  );
};

export default SuccessPage;
