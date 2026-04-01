import './App.css';
import { useChat } from './hooks/useChat';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';

function App() {
  const { messages, send, isLoading, currentModel, setCurrentModel } = useChat();

  // 可用的AI模型列表
  const availableModels = [
    { value: 'qwen3.5-flash', label: 'Qwen 3.5 Flash' },
    { value: 'qwen3.5-plus', label: 'Qwen 3.5 Plus' },
    { value: 'qwen3.5-122b-a10b', label: 'Qwen 3.5 122B A10B' },
    { value: 'glim-5', label: 'Glim-5' }
  ];

  return (
    <div className="app">
      <div className="chat-container">
        <header className="chat-header">
          <div className="header-content">
            <p>基于阿里云百炼</p>
            <div className="model-selector">
              <select
                value={currentModel}
                onChange={(e) => setCurrentModel(e.target.value)}
                disabled={isLoading}
              >
                {availableModels.map(model => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>
        <MessageList messages={messages} />
        <InputArea onSend={send} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;
