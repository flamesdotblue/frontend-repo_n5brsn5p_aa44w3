import React, { useState } from 'react';
import { Settings, Brain, Server, FolderOpen, PlugZap } from 'lucide-react';

const ModelControls = ({ config, onChange }) => {
  const [localFiles, setLocalFiles] = useState([]);

  const handleSourceChange = (e) => {
    onChange({ ...config, source: e.target.value });
  };

  const handleFolderFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setLocalFiles(files.map((f) => f.name));
    onChange({ ...config, localModelFiles: files.map((f) => f.name) });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/70 to-slate-950/70 p-5 shadow-xl backdrop-blur">
      <div className="mb-4 flex items-center gap-2 text-slate-200">
        <Settings className="h-5 w-5 text-fuchsia-400" />
        <h3 className="text-lg font-semibold">Model & Runtime</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-slate-300">Source</span>
          <select
            value={config.source}
            onChange={handleSourceChange}
            className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none ring-0 focus:border-fuchsia-400/50"
          >
            <option value="local">Local Folder</option>
            <option value="ollama">Ollama</option>
            <option value="remote">Remote API</option>
          </select>
        </label>

        {config.source === 'ollama' && (
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Ollama Model Name</span>
            <input
              type="text"
              placeholder="e.g. llama3:instruct"
              value={config.ollamaModel}
              onChange={(e) => onChange({ ...config, ollamaModel: e.target.value })}
              className="rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-fuchsia-400/50"
            />
          </label>
        )}

        {config.source === 'remote' && (
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm text-slate-300">Remote API Base URL</span>
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-cyan-300" />
              <input
                type="url"
                placeholder="https://device.local:8000"
                value={config.remoteUrl}
                onChange={(e) => onChange({ ...config, remoteUrl: e.target.value })}
                className="flex-1 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-fuchsia-400/50"
              />
            </div>
          </label>
        )}

        {config.source === 'local' && (
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm text-slate-300">Drop model files</span>
            <div className="flex items-center gap-3 rounded-lg border border-dashed border-white/15 bg-slate-900/40 p-3">
              <FolderOpen className="h-5 w-5 text-amber-300" />
              <input
                type="file"
                webkitdirectory="true"
                directory="true"
                multiple
                onChange={handleFolderFiles}
                className="block w-full cursor-pointer text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:text-slate-100 hover:file:bg-white/20"
              />
            </div>
            {localFiles.length > 0 && (
              <div className="max-h-24 overflow-y-auto rounded-md bg-slate-950/50 p-2 text-xs text-slate-400">
                {localFiles.slice(0, 6).map((f, i) => (
                  <div key={i} className="truncate">{f}</div>
                ))}
                {localFiles.length > 6 && (
                  <div className="mt-1 text-slate-500">+ {localFiles.length - 6} more</div>
                )}
              </div>
            )}
          </label>
        )}

        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-900/60 p-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-violet-300" />
            <div>
              <div className="text-sm font-medium text-slate-200">Memory</div>
              <div className="text-xs text-slate-400">Let the assistant remember context across sessions.</div>
            </div>
          </div>
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={config.memory}
              onChange={(e) => onChange({ ...config, memory: e.target.checked })}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-slate-700 after:ml-[2px] after:mt-[2px] after:block after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-fuchsia-500 peer-checked:after:translate-x-5" />
          </label>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-900/60 p-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <PlugZap className="h-5 w-5 text-teal-300" />
            <div>
              <div className="text-sm font-medium text-slate-200">Function Calling</div>
              <div className="text-xs text-slate-400">Allow the model to request external API calls via your device.</div>
            </div>
          </div>
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={config.tools}
              onChange={(e) => onChange({ ...config, tools: e.target.checked })}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-slate-700 after:ml-[2px] after:mt-[2px] after:block after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-cyan-500 peer-checked:after:translate-x-5" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModelControls;
