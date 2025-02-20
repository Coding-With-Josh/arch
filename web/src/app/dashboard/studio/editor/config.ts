import { editor } from 'monaco-editor';

export const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  fontSize: 14,
  fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
  fontLigatures: true,
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: 'on',
  suggestOnTriggerCharacters: true,
  quickSuggestions: true,
  folding: true,
  lineNumbers: 'on',
  glyphMargin: true,
  links: true,
  contextmenu: true,
  mouseWheelZoom: true,
  lineHeight: 1.6,
  padding: { top: 16, bottom: 16 },
  smoothScrolling: true,
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: "on",
  renderWhitespace: 'selection',
  bracketPairColorization: { enabled: true },
  guides: {
    bracketPairs: true,
    indentation: true,
  },
};

export const defaultFiles = {
  rust: `fn main() {
    println!("Hello, world!");
}`,
  solidity: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting = "Hello, World!";
}`,
  typescript: `function hello(): string {
    return "Hello, World!";
}`,
};
