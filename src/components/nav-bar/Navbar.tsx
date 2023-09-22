'use client';
import React from 'react';
import './Navbar.scss';
import Link from 'next/link';
import Menu from './sm-menu/Menu';
import CartIcon from './cart-icon/CartIcon';
import AuthLinks from './auth-links/AuthLinks';
const Navbar = () => {
  const [isFixed, setIsFixed] = React.useState(false);  

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 40 ? setIsFixed(true) : setIsFixed(false);
    });
  }, []);

  return (
    <div className={`nav-bar ${isFixed ? 'fixed-sb' : ''}`}>
      <div className='md-menu'>
        <Link href='/'>Головна</Link>
        <Link href='/menu'>Меню</Link>
        <Link href='/'>Контакти</Link>
      </div>
      <div className='logo'>
        <Link href='/'>
          <img src='/logo.png' />
        </Link>
      </div>
      <div className='md-menu'>
        <AuthLinks/>
        <Link href='/cart'>
          <CartIcon />
        </Link>
      </div>
      <div className='sm-menu'>
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
