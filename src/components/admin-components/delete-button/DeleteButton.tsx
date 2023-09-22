'use client';
import React from 'react';
import './DeleteButton.scss';
import { AiFillDelete } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'loading') return;
  if (status === 'unauthenticated' || !session?.user.isAdmin) return;
  const handleClickOnDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      toast('Успішно видалено.');
      return router.push('/menu');
    } else {
      const err = await res.json();
      toast.error(err.message);
    }
  };

  return (
    <button className='delete-button' onClick={handleClickOnDelete}>
      <AiFillDelete />
    </button>
  );
};

export default DeleteButton;
