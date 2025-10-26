import React, { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import ModelControls from './components/ModelControls';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [config, setConfig] = useState({
    source: 'ollama',
    ollamaModel: 'llama3:instruct',
    remoteUrl: '',
    memory: true,
    tools: true,
    localModelFiles: [],
  });

  const subtitle = useMemo(() => {
    switch (config.source) {
      case 'local':
        return 'Local model files ready';
      case 'ollama':
        return `Using Ollama • ${config.ollamaModel || 'set a model'}`;
      case 'remote':
        return `Remote • ${config.remoteUrl || 'set base URL'}`;
      default:
        return '';
    }
  }, [config]);

  const handleSend = (text, attachments) => {
    const userMsg = { role: 'user', content: text, attachments };
    setMessages((prev) => [...prev, userMsg]);

    // Simulated assistant response for demo UI
    setThinking(true);
    setTimeout(() => {
      const assistantMsg = {
        role: 'assistant',
        content:
          'This is a simulated response. Wire this UI to your local model, Ollama, or remote API to go live. Memory is ' +
          (config.memory ? 'enabled' : 'disabled') +
          (config.tools ? ' with function calling ON.' : ' with function calling OFF.'),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setThinking(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <HeroSection />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ModelControls config={config} onChange={setConfig} />
            <div className="mt-3 text-xs text-slate-400">{subtitle}</div>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-2">
            <ChatWindow messages={messages} thinking={thinking} />
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
