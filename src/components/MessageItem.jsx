import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MessageItem({ message }) {
  const isUser = message.role === 'user';

  // 消息状态图标
  const getStatusIcon = () => {
    if (message.isLoading) return '⏳';
    if (message.status === 'sending') return '⏳';
    if (message.status === 'sent' || message.status === 'success') return '✅';
    if (message.status === 'failed' || message.isError) return '❌';
    return null;
  };

  return (
    <div className={`message ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-avatar">
        {isUser ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        {message.isLoading ? (
          <div className="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </div>
        ) : isUser ? (
          <div>
            {message.content}
            {getStatusIcon() && <span className="message-status">{getStatusIcon()}</span>}
          </div>
        ) : (
          <div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
            {getStatusIcon() && <span className="message-status">{getStatusIcon()}</span>}
          </div>
        )}
      </div>
    </div>
  );
}