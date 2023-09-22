import React from 'react';
import './Message.scss';
import { MessageType } from '@/types/types';
const getMessage = async () => {
  const res = await fetch('http://localhost:3000/api/message', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Помилка!');
  }
  return res.json();
};

const Message = async () => {
  const message: MessageType = await getMessage();

  return (
    <div className='message-div'>
      <p>{message.title}</p>
    </div>
  );
};

export default Message;
