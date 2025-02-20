import { create } from 'zustand'
import { nanoid } from 'nanoid'

export interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  content?: string
  language?: string
  path?: string
  items?: FileItem[]
  parentId?: string | null
  createdAt: Date
  updatedAt: Date
}

interface FileStore {
  files: FileItem[]
  selectedFile: FileItem | null
  createFile: (name: string, parentId?: string) => void
  createFolder: (name: string, parentId?: string) => void
  deleteItem: (id: string) => void
  renameItem: (id: string, newName: string) => void
  updateFileContent: (id: string, content: string) => void
  setSelectedFile: (file: FileItem | null) => void
  moveItem: (id: string, newParentId: string | null) => void
}

export const useFileStore = create<FileStore>((set) => ({
  files: [
    {
      id: "src",
      name: "src",
      type: "folder",
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: "main",
          name: "main.rs",
          type: "file",
          content: "fn main() {\n    println!(\"Hello, World!\");\n}",
          language: "rust",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "lib",
          name: "lib.rs",
          type: "file",
          content: "pub fn add(a: i32, b: i32) -> i32 {\n    a + b\n}",
          language: "rust",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    }
  ],
  selectedFile: null,

  createFile: (name, parentId) => {
    const newFile: FileItem = {
      id: nanoid(),
      name,
      type: 'file',
      content: '',
      parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set((state) => {
      const newFiles = addItemToFiles(state.files, newFile, parentId)
      return { files: newFiles, selectedFile: newFile }
    })
  },

  createFolder: (name, parentId) => {
    const newFolder: FileItem = {
      id: nanoid(),
      name,
      type: 'folder',
      items: [],
      parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set((state) => ({
      files: addItemToFiles(state.files, newFolder, parentId)
    }))
  },

  deleteItem: (id) => {
    set((state) => ({
      files: deleteItemFromFiles(state.files, id),
      selectedFile: state.selectedFile?.id === id ? null : state.selectedFile
    }))
  },

  renameItem: (id, newName) => {
    set((state) => ({
      files: renameItemInFiles(state.files, id, newName)
    }))
  },

  updateFileContent: (id, content) => {
    set((state) => ({
      files: updateFileContentInFiles(state.files, id, content)
    }))
  },

  setSelectedFile: (file) => {
    set({ selectedFile: file })
  },

  moveItem: (id, newParentId) => {
    set((state) => ({
      files: moveItemInFiles(state.files, id, newParentId)
    }))
  },
}))

// Helper functions for manipulating the file tree
function addItemToFiles(files: FileItem[], newItem: FileItem, parentId?: string): FileItem[] {
  if (!parentId) {
    return [...files, newItem]
  }

  return files.map((file) => {
    if (file.id === parentId && file.type === 'folder') {
      return {
        ...file,
        items: [...(file.items || []), newItem]
      }
    }
    if (file.items) {
      return {
        ...file,
        items: addItemToFiles(file.items, newItem, parentId)
      }
    }
    return file
  })
}

function deleteItemFromFiles(files: FileItem[], id: string): FileItem[] {
  return files.filter((file) => {
    if (file.id === id) {
      return false;
    }
    if (file.items) {
      file.items = deleteItemFromFiles(file.items, id);
    }
    return true;
  });
}

function renameItemInFiles(files: FileItem[], id: string, newName: string): FileItem[] {
  return files.map((file) => {
    if (file.id === id) {
      return {
        ...file,
        name: newName,
        updatedAt: new Date(),
      };
    }
    if (file.items) {
      return {
        ...file,
        items: renameItemInFiles(file.items, id, newName),
      };
    }
    return file;
  });
}

function updateFileContentInFiles(files: FileItem[], id: string, content: string): FileItem[] {
  return files.map((file) => {
    if (file.id === id) {
      return {
        ...file,
        content,
        updatedAt: new Date(),
      };
    }
    if (file.items) {
      return {
        ...file,
        items: updateFileContentInFiles(file.items, id, content),
      };
    }
    return file;
  });
}

function moveItemInFiles(files: FileItem[], id: string, newParentId: string | null): FileItem[] {
  let itemToMove: FileItem | null = null;
  
  // First find and remove the item
  const newFiles = deleteItemFromFiles(files, id);
  
  // Find the item that was removed
  const findItem = (items: FileItem[]): FileItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.items) {
        const found = findItem(item.items);
        if (found) return found;
      }
    }
    return null;
  };
  
  itemToMove = findItem(files);
  
  if (!itemToMove) return files;
  
  // If no new parent, add to root
  if (!newParentId) {
    return [...newFiles, { ...itemToMove, parentId: null }];
  }
  
  // Add the item to its new parent
  return newFiles.map((file) => {
    if (file.id === newParentId && file.type === 'folder') {
      return {
        ...file,
        items: [...(file.items || []), { ...itemToMove!, parentId: newParentId }],
      };
    }
    if (file.items) {
      return {
        ...file,
        items: moveItemInFiles(file.items, id, newParentId),
      };
    }
    return file;
  });
}

export function findItemById(files: FileItem[], id: string): FileItem | null {
  for (const file of files) {
    if (file.id === id) return file;
    if (file.items) {
      const found = findItemById(file.items, id);
      if (found) return found;
    }
  }
  return null;
}

export function getItemPath(files: FileItem[], id: string): string {
  const buildPath = (items: FileItem[], itemId: string, path: string[] = []): string[] | null => {
    for (const item of items) {
      if (item.id === itemId) return [...path, item.name];
      if (item.items) {
        const foundPath = buildPath(item.items, itemId, [...path, item.name]);
        if (foundPath) return foundPath;
      }
    }
    return null;
  };

  const path = buildPath(files, id);
  return path ? path.join('/') : '';
}
