import { useState } from 'react';
import { sendMessage } from '../services/api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState('qwen3.5-flash');

  const send = async (content, model = currentModel) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content,
      timestamp: new Date(),
      status: 'sending',
      model: model
    };
    setMessages(prev => [...prev, userMessage]);

    const aiPlaceholder = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '',
      isLoading: true,
      timestamp: new Date(),
      status: 'loading',
      model: model
    };
    setMessages(prev => [...prev, aiPlaceholder]);

    setIsLoading(true);

    try {
      // 更新用户消息状态为已发送
      setMessages(prev => prev.map(msg =>
        msg.id === userMessage.id
          ? { ...msg, status: 'sent' }
          : msg
      ));
      
      const aiResponse = await sendMessage(content, model);
      setMessages(prev => prev.map(msg =>
        msg.id === aiPlaceholder.id
          ? { ...msg, content: aiResponse, isLoading: false, status: 'success' }
          : msg
      ));
    } catch (error) {
      // 更新用户消息状态为发送失败
      setMessages(prev => prev.map(msg =>
        msg.id === userMessage.id
          ? { ...msg, status: 'failed' }
          : msg
      ));
      
      setMessages(prev => prev.map(msg =>
        msg.id === aiPlaceholder.id
          ? { ...msg, content: error.message, isLoading: false, isError: true, status: 'failed' }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, send, isLoading, currentModel, setCurrentModel };
}