export const shortcuts = {
  // File operations
  'save': 'ctrl+s',
  'newFile': 'ctrl+n',
  'newFolder': 'ctrl+shift+n',
  'closeFile': 'ctrl+w',
  'closeAllFiles': 'ctrl+shift+w',
  'openFile': 'ctrl+o',
  'findFile': 'ctrl+p',

  // Editor operations
  'undo': 'ctrl+z',
  'redo': 'ctrl+shift+z',
  'copy': 'ctrl+c',
  'paste': 'ctrl+v',
  'cut': 'ctrl+x',
  'selectAll': 'ctrl+a',
  'find': 'ctrl+f',
  'replace': 'ctrl+h',
  'formatCode': 'alt+shift+f',
  'toggleComment': 'ctrl+/',
  'indentLine': 'ctrl+]',
  'outdentLine': 'ctrl+[',
  'duplicateLine': 'shift+alt+down',
  'deleteLine': 'ctrl+shift+k',
  'moveLineUp': 'alt+up',
  'moveLineDown': 'alt+down',

  // View operations
  'toggleTerminal': 'ctrl+`',
  'toggleSidebar': 'ctrl+b',
  'togglePreview': 'ctrl+shift+v',
  'commandPalette': 'ctrl+shift+p',
  'zoomIn': 'ctrl+=',
  'zoomOut': 'ctrl+-',
  'resetZoom': 'ctrl+0',

  // Git operations
  'gitCommit': 'ctrl+shift+g c',
  'gitPush': 'ctrl+shift+g p',
  'gitPull': 'ctrl+shift+g l',

  // Web3 operations
  'deployContract': 'ctrl+shift+d',
  'connectWallet': 'ctrl+alt+w',
  'compileContract': 'ctrl+shift+b',

  // Navigation
  'goToLine': 'ctrl+g',
  'goToFile': 'ctrl+p',
  'goToSymbol': 'ctrl+shift+o',
  'goToDefinition': 'f12',
  'goToReferences': 'shift+f12',
} as const;

export type ShortcutAction = keyof typeof shortcuts;
export type ShortcutKey = typeof shortcuts[ShortcutAction];
