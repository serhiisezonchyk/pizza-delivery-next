'use client';
import React from 'react';
import './Login.scss';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const LoginPage = () => {
  const router = useRouter();
  const { data, status } = useSession();
  if (status === 'loading') {
    return <p>Завантаження...</p>;
  }
  if (status === 'authenticated') {
    router.push('/')
  }
  return (
    <div className='login-page'>
      <div className='login-box'>
        <div className='login-box-image'>
          <Image src='/login_img.png' alt='' fill />
        </div>
        <div className='login-box-form'>
          <h1>Ласкаво просимо!</h1>
          <p>Увійдіть до системи</p>
          <button onClick={() => signIn('google')}>
            <img src='/google.png' alt='' />
            <span>Google</span>
          </button>
          <button>
            <img src='/facebook.png' alt='' />
            <span>Facebook</span>
          </button>
          <p>
            Є питання? <Link href='/'>Повідомте нас!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
