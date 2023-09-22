'use client';
import React from 'react';
import './Menu.scss';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import './Menu.scss';
import Link from 'next/link';
import CartIcon from '../cart-icon/CartIcon';
import { signOut, useSession } from 'next-auth/react';

const links = [
  { id: 1, title: 'Головна', url: '/' },
  { id: 2, title: 'Меню', url: '/menu' },
  { id: 3, title: 'Графік роботи', url: '/' },
  { id: 4, title: 'Контакти', url: '/' },
];
const Menu = () => {
  const [open, setOpen] = React.useState(false);

  const { data: session } = useSession();
  return (
    <div className='sm-menu-div'>
      {!open ? (
        <AiOutlineMenu onClick={() => setOpen(true)} />
      ) : (
        <AiOutlineClose onClick={() => setOpen(false)} />
      )}
      <div className={`links ${open ? 'open' : ''}`}>
        {links.map((link) => (
          <Link href={link.url} key={link.id} onClick={() => setOpen(false)}>
            {link.title}
          </Link>
        ))}
        {!session?.user ? (
          <Link href='/login' onClick={() => setOpen(false)}>
            Увійти
          </Link>
        ) : (
          <>
            <Link href='/login' onClick={()=>signOut()}>
              Вийти
            </Link>
            <Link href='/orders' onClick={() => setOpen(false)}>
              Замовлення
            </Link>
          </>
        )}
        <Link href='/cart' onClick={() => setOpen(false)}>
          <CartIcon />
        </Link>
      </div>
    </div>
  );
};

export default Menu;
