import { editor } from 'monaco-editor'
import { languages } from '../languages'

export const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  // Basic Settings
  fontSize: 14,
  fontFamily: 'JetBrains Mono, Menlo, Monaco, monospace',
  fontLigatures: true,
  lineHeight: 1.6,
  wordWrap: 'on',
  
  // Advanced Features
  multiCursorModifier: 'ctrlCmd',
  formatOnPaste: true,
  formatOnType: true,
  snippetSuggestions: "bottom",
  suggest: {
    preview: true,
    showMethods: true,
    showFunctions: true,
    showConstructors: true,
    showDeprecated: false,
    showFields: true,
    showVariables: true,
    showClasses: true,
    showStructs: true,
    showInterfaces: true,
    showModules: true,
    showProperties: true,
    showEvents: true,
    showOperators: true,
    showUnits: true,
    showValues: true,
    showConstants: true,
    showEnums: true,
    showEnumMembers: true,
    showKeywords: true,
    showWords: true,
    showColors: true,
    showFiles: true,
    showReferences: true,
    showFolders: true,
    showTypeParameters: true,
    showSnippets: true,
  },

  // Editor Appearance
  minimap: {
    enabled: true,
    maxColumn: 120,
    renderCharacters: false,
  },
  scrollbar: {
    useShadows: true,
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
  },
  
  // Code Intelligence
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true,
  },
  parameterHints: {
    enabled: true,
    cycle: true,
  },
  autoClosingBrackets: 'always',
  autoClosingQuotes: 'always',
  autoSurround: 'languageDefined',
  
  // Diff Editor  
  // Features
  folding: true,
  foldingStrategy: 'indentation',
  foldingHighlight: true,
  unfoldOnClickAfterEndOfLine: true,
  matchBrackets: 'always',
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: 'always',
    seedSearchStringFromSelection: 'always',
  },
  
  // Performance
  fastScrollSensitivity: 5,
  mouseWheelScrollSensitivity: 1,
  dragAndDrop: true,
}

export const diffEditorOptions: editor.IDiffEditorConstructionOptions = {
  ...editorOptions,
  enableSplitViewResizing: true,
  renderSideBySide: true,
  originalEditable: false,
}
