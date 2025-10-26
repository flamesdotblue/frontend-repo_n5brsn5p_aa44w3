import React, { useEffect, useRef, useState } from 'react';
import { Mic, Send, Paperclip, WaveSquare } from 'lucide-react';

const ChatInput = ({ onSend }) => {
  const [value, setValue] = useState('');
  const [recording, setRecording] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const recognitionRef = useRef(null);

  // Setup Web Speech API if available
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = 'en-US';
      recog.interimResults = true;
      recog.continuous = false;
      recog.onresult = (e) => {
        let transcript = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        setValue((prev) => (prev ? prev + ' ' : '') + transcript.trim());
      };
      recog.onend = () => setRecording(false);
      recognitionRef.current = recog;
    }
  }, []);

  const startStopRecording = () => {
    const recog = recognitionRef.current;
    if (!recog) {
      alert('Voice input not supported in this browser.');
      return;
    }
    if (recording) {
      recog.stop();
      setRecording(false);
    } else {
      setValue('');
      recog.start();
      setRecording(true);
    }
  };

  const handleSend = () => {
    if (!value.trim() && attachments.length === 0) return;
    onSend(value.trim(), attachments);
    setValue('');
    setAttachments([]);
  };

  return (
    <div className="flex w-full items-end gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-3">
      <label className="group relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10">
        <Paperclip className="h-5 w-5" />
        <input
          type="file"
          multiple
          onChange={(e) => setAttachments(Array.from(e.target.files || []))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask anything..."
            className="w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-fuchsia-400/50 focus:outline-none"
          />
          <button
            onClick={startStopRecording}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 ${
              recording ? 'bg-fuchsia-600/30 text-fuchsia-200' : 'bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
            title="Voice"
          >
            {recording ? <WaveSquare className="h-5 w-5 animate-pulse" /> : <Mic className="h-5 w-5" />}
          </button>
          <button
            onClick={handleSend}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-fuchsia-600/80 to-cyan-600/80 text-white hover:from-fuchsia-500 hover:to-cyan-500"
            title="Send"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        {attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {attachments.map((f, i) => (
              <span key={i} className="truncate rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">
                {f.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
