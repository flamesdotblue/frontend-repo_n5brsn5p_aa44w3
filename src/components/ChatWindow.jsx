import React, { useEffect, useRef } from 'react';
import { Bot, User, Loader2 } from 'lucide-react';

const Message = ({ role, content, attachments }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="mt-1 rounded-full bg-fuchsia-500/20 p-2 text-fuchsia-300">
          <Bot className="h-5 w-5" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
          isUser
            ? 'bg-gradient-to-b from-slate-800 to-slate-900 text-slate-100 border border-white/10'
            : 'bg-gradient-to-b from-fuchsia-500/10 to-cyan-500/10 text-slate-100 border border-white/10'
        }`}
      >
        <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
        {attachments && attachments.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {attachments.map((a, i) => (
              <div key={i} className="truncate rounded-md bg-white/5 p-2 text-xs text-slate-300">
                {a.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {isUser && (
        <div className="mt-1 rounded-full bg-sky-500/20 p-2 text-sky-300">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};

const ChatWindow = ({ messages, thinking }) => {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  return (
    <div className="h-[50vh] w-full overflow-y-auto rounded-2xl border border-white/10 bg-gradient-to-b from-slate-950/60 to-slate-900/40 p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {messages.length === 0 && (
          <div className="mt-8 text-center text-slate-400">
            Start a conversation — ask for anything, attach a file, or use your voice.
          </div>
        )}
        {messages.map((m, idx) => (
          <Message key={idx} role={m.role} content={m.content} attachments={m.attachments} />
        ))}
        {thinking && (
          <div className="flex items-center gap-2 text-slate-300">
            <div className="rounded-full bg-fuchsia-500/20 p-2 text-fuchsia-300">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
