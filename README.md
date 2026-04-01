# AI Chat Component

A React component for AI chat using Aliyun DashScope API.

## Features

- ✅ Message status display (sending, sent, failed)
- ✅ Model selection (Qwen 3.5 Flash, Qwen 3.5 Plus, etc.)
- ✅ Markdown support for AI responses
- ✅ Comprehensive error handling
- ✅ Responsive design

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ai-chat-component.git

# Navigate to the project directory
cd ai-chat-component

# Install dependencies
npm install
```

## Configuration

1. Create a `.env` file in the root directory
2. Add your Aliyun DashScope API key:

```
VITE_BAILIAN_API_KEY=your-api-key-here
```

## Usage

### Basic Usage

```jsx
import { useChat } from './hooks/useChat';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';

function App() {
  const { messages, send, isLoading, currentModel, setCurrentModel } = useChat();

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
                <option value="qwen3.5-flash">Qwen 3.5 Flash</option>
                <option value="qwen3.5-plus">Qwen 3.5 Plus</option>
                <option value="qwen3.5-122b-a10b">Qwen 3.5 122B A10B</option>
                <option value="glim-5">Glim-5</option>
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
```

### Components

#### MessageList

Displays the list of messages.

**Props:**
- `messages`: Array of message objects

#### MessageItem

Displays a single message.

**Props:**
- `message`: Message object

#### InputArea

Handles user input and message sending.

**Props:**
- `onSend`: Function to send a message
- `disabled`: Boolean to disable input

### Hooks

#### useChat

Manages chat state and API calls.

**Returns:**
- `messages`: Array of message objects
- `send`: Function to send a message
- `isLoading`: Boolean indicating if a message is being sent
- `currentModel`: Current AI model
- `setCurrentModel`: Function to set the AI model

## API

### sendMessage

Sends a message to the AI API and returns the response.

**Parameters:**
- `message`: String - The message to send
- `model`: String - The AI model to use (default: 'qwen3.5-flash')

**Returns:**
- Promise<String> - The AI's response

## Available Models

- `qwen3.5-flash`
- `qwen3.5-plus`
- `qwen3.5-122b-a10b`
- `glim-5`

## Styling

The component uses CSS for styling. You can customize the styles by modifying the `App.css` file.

## License

MIT
