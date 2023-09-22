'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const OfferButton = ({id}:{id:string}) => {
  const router = useRouter();
  return <button onClick={() => router.push(`/product/${id}`)}>Замовити</button>;
};

export default OfferButton;
