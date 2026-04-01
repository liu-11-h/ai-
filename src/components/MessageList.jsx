import { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <>
          <div className="welcome-message">
            <p>发送消息开始与 AI 对话</p>
          </div>
          <div ref={bottomRef} />
        </>
      ) : (
        <>
          {messages.map(msg => (
            <MessageItem key={msg.id} message={msg} />
          ))}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}