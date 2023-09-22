'use client';
import React from 'react';
import { FiDelete } from 'react-icons/fi';
import './CartPage.scss';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { TiTick } from 'react-icons/ti';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const CartPage = () => {
  const router = useRouter();
  const { products, totalPrice, quantity, removeFromCart, clearCart } =
    useCartStore();
  const { data: session } = useSession();

  const [checked, setChecked] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  React.useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  const handleOnSubmitClick = async () => {
    if (products.length === 0) {
      toast.error('Кошик порожній');
      return;
    }
    if (!session) router.push('/');
    else
      try {
        const res = await fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            price: totalPrice,
            products,
            statusTitle: checked ? 'Очікуйте підтвердження' : 'Не сплачено',
            isPaymentUponReceipt: checked,
            name: name,
            phone: phone,
            userEmail: session.user.email,
          }),
        });
        if (checked) {
          toast.success('Замовлення оформлено');
          clearCart();
          router.push('/orders');
        }
        if (!checked) {
          const data = await res.json();
          router.push(`/payment/${data.id}`);
        }
      } catch (error) {
        console.log(error);
      }
  };
  return (
    <div className='cart-page'>
      <div className='cart-product-container'>
        <div className='overflow-y-scroll'>
          {products?.map((item, index) => (
            <Link
              href={`/product/${item.id}`}
              className='cart-item'
              key={index}
            >
              <img
                src={item.img || '/Image_not_available.png'}
                alt='/Image_not_available.png'
              />
              <div className=''>
                <h1>
                  {item.title} ({item.quantity})
                </h1>
                <span>{item.optionTitle}</span>
              </div>
              <h2>{item.price}</h2>
              <FiDelete
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  removeFromCart(item);
                }}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className='cart-payment-container'>
        <div className='order-info'>
          <span>Ціна ({quantity})</span>
          <span>{totalPrice}</span>
        </div>
        <div className='order-info'>
          <span>Доставка</span>
          {totalPrice > 500 ? (
            <span className='free'>FREE</span>
          ) : (
            <span>100</span>
          )}
        </div>
        <hr />
        <div className='order-info'>
          <span>Всього</span>
          {totalPrice > 500 ? (
            <span>{totalPrice}</span>
          ) : (
            <span>{totalPrice + 100}</span>
          )}
        </div>
        <hr />

        <div className='payment-variant'>
          <p>Оплата при отриманні</p>
          <div className='flex'>
            <input
              type='checkbox'
              className='peer'
              checked={checked}
              onChange={() => setChecked((prev) => (prev = !prev))}
            />
            <TiTick className='hidden peer-checked:block' />
          </div>
        </div>
        <div className='additional-info'>
          <input
            placeholder='Імя'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder='Номер'
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>

        <button onClick={handleOnSubmitClick}>Підтвердити</button>
      </div>
    </div>
  );
};

export default CartPage;
