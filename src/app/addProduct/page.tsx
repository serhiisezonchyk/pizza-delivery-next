'use client';
import React, { MouseEventHandler } from 'react';
import './AddProduct.scss';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiFillDelete } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { CategoryType } from '@/types/types';
import { toast } from 'react-toastify';

type ProductInputs = {
  title: string;
  description: string;
  price: number;
  catSlug: string;
};
type Option = {
  title: string;
  additionalPrice: number;
};
const AddProduct = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'unauthenticated' || session?.user.isAdmin === false) {
      router.push('/');
    }
  }, [status, session]);

  const [inputs, setInputs] = React.useState<ProductInputs>({
    title: '',
    description: '',
    price: 0,
    catSlug: '',
  });
  const [option, setOption] = React.useState<Option>({
    title: '',
    additionalPrice: 1,
  });
  const [category, setCategory] = React.useState('');
  const [options, setOptions] = React.useState<Option[]>([]);
  const [file, setFile] = React.useState<FileList | null>();

  const { isLoading, error, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      fetch('http://localhost:3000/api/categories').then((res) => res.json()),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleAddOption = () => {
    if (!option.title || !option.additionalPrice)
      return toast.error('Поля повинні бути заповнені.');
    if (options.some((opt) => opt.title === option.title))
      return toast.error('Така опція вже існує.');

    setOptions((prev) => [...prev, option]);
  };

  const handleDeleteOption = (title: string) => {
    setOptions(options.filter((option) => option.title !== title));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify({
          ...inputs,
          options,
          catSlug: category,
        }),
      });
      const data = await res.json();
      if (!res.ok) toast.error(data.message);
      else router.push(`/product/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (
    status === 'loading' ||
    status === 'unauthenticated' ||
    session?.user.isAdmin === false
  ) {
    return <p>Завантаження</p>;
  }
  return (
    <div className='add-product-page'>
      <form className='add-product-form' onSubmit={handleSubmit}>
        <h1>Додати новий продукт</h1>
        <div className='input-div'>
          <label>Зображення</label>
          <input onChange={(e) => setFile(e.target.files)} type='file' />
        </div>
        <div className='input-div'>
          <label>Назва</label>
          <input onChange={handleChange} type='text' name='title' />
        </div>
        <div className='input-div'>
          <label>Опис</label>
          <textarea name='description' onChange={handleChange} />
        </div>
        <div className='input-div'>
          <label>Ціна</label>
          <input onChange={handleChange} type='number' name='price' />
        </div>
        <div className='input-div'>
          <label>Категорія</label>
          {isLoading ? (
            <p>Завантаження...</p>
          ) : (
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value='' selected disabled hidden>
                Оберіть категорію
              </option>

              {data.map((category: CategoryType) => (
                <option key={category.id} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className='input-div'>
          <label>Опції</label>
          <div className='options-div'>
            <input
              type='text'
              onChange={handleChangeOptions}
              placeholder='Назва опції'
              name='title'
            />
            <input
              type='number'
              onChange={handleChangeOptions}
              placeholder='Множник ціни'
              name='additionalPrice'
            />
          </div>
          <div className='options-add-button' onClick={handleAddOption}>
            Додати опцію
          </div>
        </div>
        <div className='options-container'>
          {options.map((item, index) => (
            <div className='option-item' key={index}>
              <div className='option-item-spans'>
                <span>{item.title}</span>
                <span>{item.additionalPrice}</span>
              </div>
              <div
                className='options-delete-button'
                onClick={() => handleDeleteOption(item.title)}
              >
                <AiFillDelete />
              </div>
            </div>
          ))}
        </div>
        <div className='input-div'>
          <button type='submit'>Додати продукт</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
