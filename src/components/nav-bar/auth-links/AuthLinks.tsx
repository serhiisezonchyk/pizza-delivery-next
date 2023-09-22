'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const AuthLinks = () => {
  const { status } = useSession();
  return (
    <div>
      {status === 'authenticated' ? (
        <div className='auth-links'>
          <Link href='/orders'>Замовлення</Link>
          <span onClick={()=>signOut()}>Вийти</span>
        </div>
      ) : (
        <Link href='/login'>Увійти</Link>
      )}
    </div>
  );
};

export default AuthLinks;
