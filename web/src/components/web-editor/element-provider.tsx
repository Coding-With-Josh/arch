"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import type { CSSProperties } from 'react'

export type ElementType =
  | "section"
  | "container"
  | "heading"
  | "paragraph"
  | "button"
  | "image"
  | "grid"
  | "column"
  | "divider"

export type ElementStyle = {
  width?: string;
  height?: string;
  minHeight?: string;
  marginBottom?: string;
  maxWidth?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: CSSProperties['textAlign'];
  padding?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
  display?: CSSProperties['display'];
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: string;
}

export interface ElementData {
  id: string
  type: ElementType
  name: string
  content?: string
  src?: string
  alt?: string
  href?: string
  styles: ElementStyle
  children: ElementData[]
  parentId: string | null
  expanded?: boolean
  visible?: boolean
}

interface ElementContextType {
  elements: ElementData[]
  selectedElement: string | null
  setSelectedElement: (id: string | null) => void
  getElement: (id: string) => ElementData | undefined
  addElement: (element: Partial<ElementData>, parentId?: string | null) => string
  updateElement: (id: string, updates: Partial<ElementData>) => void
  updateElementStyle: (id: string, styles: Partial<ElementStyle>) => void
  deleteElement: (id: string) => void
  moveElement: (id: string, newParentId: string | null, indexInParent?: number) => void
  duplicateElement: (id: string) => string
  draggedElement: string | null
  setDraggedElement: (id: string | null) => void
  dropTargetId: string | null
  setDropTargetId: (id: string | null) => void
  toggleElementVisibility: (id: string) => void
  toggleElementExpanded: (id: string) => void
}

const defaultElements: ElementData[] = [
  {
    id: "root",
    type: "section",
    name: "Page Root",
    styles: {
      width: "100%",
      padding: "20px",
    },
    children: [],
    parentId: null,
    expanded: true,
    visible: true,
  },
]

const ElementContext = createContext<ElementContextType | undefined>(undefined)

export function ElementProvider({ children }: { children: React.ReactNode }) {
  const [elements, setElements] = useState<ElementData[]>(defaultElements)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [draggedElement, setDraggedElement] = useState<string | null>(null)
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)

  const getElement = (id: string) => {
    return findElementById(elements, id)
  }

  const findElementById = (elements: ElementData[], id: string): ElementData | undefined => {
    for (const element of elements) {
      if (element.id === id) {
        return element
      }
      if (element.children.length > 0) {
        const found = findElementById(element.children, id)
        if (found) return found
      }
    }
    return undefined
  }

  const addElement = (element: Partial<ElementData>, parentId: string | null = "root") => {
    const id = uuidv4()
    const newElement: ElementData = {
      id,
      type: element.type || "container",
      name: element.name || `${element.type || "Element"} ${id.substring(0, 4)}`,
      content: element.content,
      src: element.src,
      alt: element.alt,
      href: element.href,
      styles: element.styles || {},
      children: element.children || [],
      parentId,
      expanded: element.expanded !== undefined ? element.expanded : true,
      visible: element.visible !== undefined ? element.visible : true,
    }

    setElements((prevElements) => {
      return addElementToTree(prevElements, newElement, parentId)
    })

    return id
  }

  const addElementToTree = (
    elements: ElementData[],
    newElement: ElementData,
    parentId: string | null,
  ): ElementData[] => {
    return elements.map((element) => {
      if (element.id === parentId) {
        return {
          ...element,
          children: [...element.children, newElement],
        }
      } else if (element.children.length > 0) {
        return {
          ...element,
          children: addElementToTree(element.children, newElement, parentId),
        }
      }
      return element
    })
  }

  const updateElement = (id: string, updates: Partial<ElementData>) => {
    setElements((prevElements) => {
      return updateElementInTree(prevElements, id, updates)
    })
  }

  const updateElementInTree = (elements: ElementData[], id: string, updates: Partial<ElementData>): ElementData[] => {
    return elements.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          ...updates,
          styles: updates.styles ? { ...element.styles, ...updates.styles } : element.styles,
        }
      } else if (element.children.length > 0) {
        return {
          ...element,
          children: updateElementInTree(element.children, id, updates),
        }
      }
      return element
    })
  }

  const updateElementStyle = (id: string, styles: Partial<ElementStyle>) => {
    setElements((prevElements) => {
      return updateElementStyleInTree(prevElements, id, styles)
    })
  }

  const updateElementStyleInTree = (
    elements: ElementData[],
    id: string,
    styles: Partial<ElementStyle>,
  ): ElementData[] => {
    return elements.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          styles: { ...element.styles, ...styles },
        }
      } else if (element.children.length > 0) {
        return {
          ...element,
          children: updateElementStyleInTree(element.children, id, styles),
        }
      }
      return element
    })
  }

  const deleteElement = (id: string) => {
    if (id === "root") return

    if (selectedElement === id) {
      setSelectedElement(null)
    }

    setElements((prevElements) => {
      return deleteElementFromTree(prevElements, id)
    })
  }

  const deleteElementFromTree = (elements: ElementData[], id: string): ElementData[] => {
    return elements
      .filter((element) => element.id !== id)
      .map((element) => {
        if (element.children.length > 0) {
          return {
            ...element,
            children: deleteElementFromTree(element.children, id),
          }
        }
        return element
      })
  }

  const moveElement = (id: string, newParentId: string | null, indexInParent?: number) => {
    if (id === "root" || id === newParentId) return

    const elementToMove = getElement(id)
    if (!elementToMove) return

    // Remove element from its current location
    setElements((prevElements) => {
      const elementsAfterRemoval = deleteElementFromTree(prevElements, id)

      // If no parent specified, move to root
      if (!newParentId) {
        const movedElement = { ...elementToMove, parentId: null }
        return [...elementsAfterRemoval, movedElement]
      }

      // Add element to new parent
      return addElementToTreeAtIndex(
        elementsAfterRemoval,
        { ...elementToMove, parentId: newParentId },
        newParentId,
        indexInParent,
      )
    })
  }

  const addElementToTreeAtIndex = (
    elements: ElementData[],
    newElement: ElementData,
    parentId: string,
    index?: number,
  ): ElementData[] => {
    return elements.map((element) => {
      if (element.id === parentId) {
        const newChildren = [...element.children]
        if (index !== undefined && index >= 0 && index <= newChildren.length) {
          newChildren.splice(index, 0, newElement)
        } else {
          newChildren.push(newElement)
        }
        return {
          ...element,
          children: newChildren,
        }
      } else if (element.children.length > 0) {
        return {
          ...element,
          children: addElementToTreeAtIndex(element.children, newElement, parentId, index),
        }
      }
      return element
    })
  }

  const duplicateElement = (id: string): string => {
    const element = getElement(id)
    if (!element) return ""

    const duplicatedId = uuidv4()
    const duplicateElementDeep = (el: ElementData, newParentId: string | null): ElementData => {
      const newId = uuidv4()
      return {
        ...el,
        id: newId,
        name: `${el.name} (copy)`,
        parentId: newParentId,
        children: el.children.map((child) => duplicateElementDeep(child, newId)),
      }
    }

    const duplicated = duplicateElementDeep(element, element.parentId)

    setElements((prevElements) => {
      return addElementToTree(prevElements, duplicated, element.parentId)
    })

    return duplicatedId
  }

  const toggleElementVisibility = (id: string) => {
    setElements((prevElements) => {
      return prevElements.map((element) => {
        if (element.id === id) {
          return { ...element, visible: !element.visible }
        } else if (element.children.length > 0) {
          return { ...element, children: toggleElementVisibilityInTree(element.children, id) }
        }
        return element
      })
    })
  }

  const toggleElementVisibilityInTree = (elements: ElementData[], id: string): ElementData[] => {
    return elements.map((element) => {
      if (element.id === id) {
        return { ...element, visible: !element.visible }
      } else if (element.children.length > 0) {
        return { ...element, children: toggleElementVisibilityInTree(element.children, id) }
      }
      return element
    })
  }

  const toggleElementExpanded = (id: string) => {
    setElements((prevElements) => {
      return prevElements.map((element) => {
        if (element.id === id) {
          return { ...element, expanded: !element.expanded }
        } else if (element.children.length > 0) {
          return { ...element, children: toggleElementExpandedInTree(element.children, id) }
        }
        return element
      })
    })
  }

  const toggleElementExpandedInTree = (elements: ElementData[], id: string): ElementData[] => {
    return elements.map((element) => {
      if (element.id === id) {
        return { ...element, expanded: !element.expanded }
      } else if (element.children.length > 0) {
        return { ...element, children: toggleElementExpandedInTree(element.children, id) }
      }
      return element
    })
  }

  // Initialize with a default page structure
  useEffect(() => {
    // Example initialization
    setElements([
      {
        id: "root",
        type: "section",
        name: "Page",
        styles: {
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#09090b", // zinc-950,
        },
        children: [
          {
            id: "header",
            type: "section",
            name: "Header",
            styles: {
              width: "100%",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#18181b", // zinc-900
            },
            parentId: "root",
            visible: true,
            expanded: true,
            children: [
              {
                id: "logo",
                type: "heading",
                name: "Logo",
                content: "WebFlow",
                styles: {
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#ffffff",
                },
                parentId: "header",
                visible: true,
                expanded: true,
                children: [],
              },
              {
                id: "nav",
                type: "container",
                name: "Navigation",
                styles: {
                  display: "flex",
                  gap: "20px",
                },
                parentId: "header",
                visible: true,
                expanded: true,
                children: [
                  {
                    id: "nav-item-1",
                    type: "button",
                    name: "Home",
                    content: "Home",
                    styles: {
                      padding: "8px 16px",
                      backgroundColor: "transparent",
                      color: "#ffffff",
                      border: "none",
                    },
                    parentId: "nav",
                    visible: true,
                    expanded: true,
                    children: [],
                  },
                  {
                    id: "nav-item-2",
                    type: "button",
                    name: "About",
                    content: "About",
                    styles: {
                      padding: "8px 16px",
                      backgroundColor: "transparent",
                      color: "#ffffff",
                      border: "none",
                    },
                    parentId: "nav",
                    visible: true,
                    expanded: true,
                    children: [],
                  },
                  {
                    id: "nav-item-3",
                    type: "button",
                    name: "Contact",
                    content: "Contact",
                    styles: {
                      padding: "8px 16px",
                      backgroundColor: "#3b82f6", // blue-500
                      color: "#ffffff",
                      borderRadius: "6px",
                      border: "none",
                    },
                    parentId: "nav",
                    visible: true,
                    expanded: true,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "hero",
            type: "section",
            name: "Hero Section",
            styles: {
              width: "100%",
              padding: "60px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#09090b", // zinc-950
            },
            parentId: "root",
            visible: true,
            expanded: true,
            children: [
              {
                id: "hero-heading",
                type: "heading",
                name: "Hero Heading",
                content: "Build Websites Without Code",
                styles: {
                  fontSize: "42px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  textAlign: "center",
                  marginBottom: "20px",
                },
                parentId: "hero",
                visible: true,
                expanded: true,
                children: [],
              },
              {
                id: "hero-text",
                type: "paragraph",
                name: "Hero Text",
                content:
                  "Create stunning websites with our visual editor and add powerful functionality with our flow builder. No coding required.",
                styles: {
                  fontSize: "18px",
                  color: "#a1a1aa", // zinc-400
                  textAlign: "center",
                  maxWidth: "600px",
                  marginBottom: "30px",
                },
                parentId: "hero",
                visible: true,
                expanded: true,
                children: [],
              },
              {
                id: "cta-button",
                type: "button",
                name: "CTA Button",
                content: "Get Started",
                styles: {
                  padding: "12px 24px",
                  backgroundColor: "#3b82f6", // blue-500
                  color: "#ffffff",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  border: "none",
                },
                parentId: "hero",
                visible: true,
                expanded: true,
                children: [],
              },
            ],
          },
        ],
        parentId: null,
        expanded: true,
        visible: true,
      },
    ])
  }, [])

  const value = {
    elements,
    selectedElement,
    setSelectedElement,
    getElement,
    addElement,
    updateElement,
    updateElementStyle,
    deleteElement,
    moveElement,
    duplicateElement,
    draggedElement,
    setDraggedElement,
    dropTargetId,
    setDropTargetId,
    toggleElementVisibility,
    toggleElementExpanded,
  }

  return <ElementContext.Provider value={value}>{children}</ElementContext.Provider>
}

export function useElements() {
  const context = useContext(ElementContext)
  if (context === undefined) {
    throw new Error("useElements must be used within an ElementProvider")
  }
  return context
}

