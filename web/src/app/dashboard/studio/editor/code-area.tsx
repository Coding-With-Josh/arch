"use client"

import * as React from "react";
import { ChevronRight, File, Settings, Terminal, Copy, Check, Play, Save } from "lucide-react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { languages } from "./languages";
import { useHotkeys } from 'react-hotkeys-hook'
import { shortcuts } from './config/shortcuts'
import { FileItem } from "./store";

interface CodeAreaProps {
  file: FileItem | null;
  onUpdate: (content: string) => void;
  onClose: (id: string) => void;
  onSave: () => void;
}

export function CodeArea({ file, onUpdate, onClose, onSave }: CodeAreaProps) {
  const monaco = useMonaco();
  const [value, setValue] = React.useState(file?.content || "");
  const [isCopied, setIsCopied] = React.useState(false);
  const [isRunning, setIsRunning] = React.useState(false);
  const [output, setOutput] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState(file?.language || "typescript");

  // Update value when file changes
  React.useEffect(() => {
    if (file) {
      setValue(file.content || "");
      setSelectedLanguage(file.language || "typescript");
    }
  }, [file]);

  // Handle content changes
  const handleEditorChange = (newValue: string | undefined) => {
    const content = newValue || "";
    setValue(content);
    onUpdate(content);
  };

  // Copy code to clipboard
  const copyCode = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Run code simulation
  const runCode = async () => {
    setIsRunning(true);
    setOutput("Compiling...\n");
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOutput(prev => prev + "Running...\n");
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOutput(prev => prev + "> Program output:\n" + value);
    setIsRunning(false);
  };

  // Editor shortcuts
  useHotkeys(shortcuts.formatCode, (e) => {
    e.preventDefault();
    // Format logic here
  });

  useHotkeys(shortcuts.save, (e) => {
    e.preventDefault();
    onSave();
  });

  if (!file) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-500">
        No file selected
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-zinc-900 text-sm text-gray-300 rounded-md px-2 py-1 border border-white/10"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
          
          {/* Action buttons */}
          <Button
            size="sm"
            variant="ghost"
            onClick={copyCode}
            className="gap-2 text-xs"
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {isCopied ? "Copied!" : "Copy"}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={runCode}
            disabled={isRunning}
            className="gap-2 text-xs"
          >
            <Play className="h-4 w-4" />
            Run
          </Button>
          
          <Button size="sm" variant="ghost" className="gap-2 text-xs" onClick={onSave}>
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>

        <Button size="sm" variant="ghost" className="gap-2 text-xs">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>

      {/* Editor */}
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex-1">
          <Editor
            height="100%"
            language={selectedLanguage}
            value={value}
            onChange={handleEditorChange}
            theme="vs-dark"
            path={file.path}
            options={{
              fontSize: 14,
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              folding: true,
              lineNumbers: "on",
              glyphMargin: true,
              links: true,
            }}
          />
        </div>

        {/* Terminal */}
        <div className="h-48 border-t border-white/10">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
            <Terminal className="h-4 w-4" />
            <span className="text-sm text-gray-400">Terminal</span>
          </div>
          <div className="p-4 font-mono text-sm text-gray-300 overflow-auto h-36">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}