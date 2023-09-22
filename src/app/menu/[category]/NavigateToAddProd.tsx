'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const NavigateToAddProd = () => {
  const { data: session, status } = useSession();
  if (status == 'authenticated' && session.user.isAdmin)
    return (
      <Link href={'/addProduct'} className='addButton'>
        <p>+</p>
      </Link>
    );
};

export default NavigateToAddProd;
