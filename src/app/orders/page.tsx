'use client';

import React from 'react';
import './OrderPage.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderType, StatusType } from '@/types/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiFillEdit } from 'react-icons/ai';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { getOrderTitle } from '@/utils/string_util';

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: ordersData,
  } = useQuery<OrderType[]>({
    queryKey: ['orders'],
    queryFn: () => fetch('/api/orders').then((res) => res.json()),
  });
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/');
    }
    if (!isLoading && !ordersData?.length) return router.push('/');
  }, [status, ordersData]);

  const {
    isLoading: isStatusLoading,
    error: statusesError,
    data: statuses,
  } = useQuery<StatusType[]>({
    queryKey: ['statuses'],
    queryFn: () => fetch('/api/status').then((res) => res.json()),
  });

  const mutation = useMutation<any, Error, { id: string; status: string }>({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleUpdateClick = (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLSelectElement;
    const status = input.value;
    mutation.mutate({ id, status });
    toast.success('Статус оновлено успішно.');
  };

  if (error || statusesError) return <p>Помилка під час завантаження даних.</p>;

  if (isLoading || isStatusLoading || !ordersData?.length)
    return <p>Завантаження...</p>;
  else
    return (
      <div className='order-page'>
        <table className='order-table'>
          <thead>
            <tr>
              <th className='block-sm'>#</th>
              <th>Дата</th>
              <th className='block-sm'>Оплата</th>

              <th>Вартість</th>
              <th className='block-sm'>Замовлення</th>
              <th>Імя/Номер</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {ordersData?.length === 0 && <p>Замовлення не знайдені.</p>}
            {ordersData?.map((item: OrderType) => (
              <tr
                className={`order-table-body ${
                  item.statusTitle === 'Доставлено' ? 'is-delivered' : ''
                }`}
                key={item.id}
              >
                <td className='block-sm'>{item.id}</td>
                <td>{dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}</td>
                <td className='block-sm'>
                  {item.isPaymentUponReceipt ? 'При отриманні' : 'Онлайн'}
                </td>
                <td>{item.price}</td>
                <td className='block-sm'>
                  {getOrderTitle(item).map((i, index) => (
                    <p key={index}>
                      {index + 1}. {i}
                    </p>
                  ))}
                </td>
                <td>
                  {item.name}
                  <br />
                  {item.phone}
                </td>
                {session?.user.isAdmin ? (
                  <td>
                    <form
                      className='admin-status-row'
                      onSubmit={(e) => handleUpdateClick(e, item.id)}
                    >
                      <select defaultValue={item.statusTitle}>
                        {!isStatusLoading &&
                          statuses?.map((status: StatusType) => (
                            <option key={status.id} value={status.title}>
                              {status.title}
                            </option>
                          ))}
                      </select>
                      <button>
                        <AiFillEdit />
                      </button>
                    </form>
                  </td>
                ) : (
                  <td>{item.statusTitle}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default OrdersPage;
