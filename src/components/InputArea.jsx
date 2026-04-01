import { useState } from 'react';

export default function InputArea({ onSend, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入消息... (Enter 发送，Shift+Enter 换行)"
        disabled={disabled}
        rows={1}
      />
      <button type="submit" disabled={disabled || !input.trim()}>
        {disabled ? '发送中...' : '发送'}
      </button>
    </form>
  );
}