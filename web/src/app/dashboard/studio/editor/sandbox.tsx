'use client'

import { useEffect, useRef, useState } from 'react'
import { CodeSandbox } from '@codesandbox/sdk'

export default function Sandbox() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sandboxUrl, setSandboxUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    const initSandbox = async () => {
      try {
        console.log('Initializing sandbox...');
        const sdk = new CodeSandbox(process.env.NEXT_PUBLIC_CSB_API_KEY);
        const sandbox = await sdk.sandbox.create({
          template: 'react-ts'
        });
        
        // Log the sandbox response for debugging
        console.log('Sandbox created:', sandbox);
        
        // Use the embedded URL instead of editorUrl
        const embedUrl = `https://codesandbox.io/p/sandbox/${sandbox.id}?embed=1`;
        console.log('Embed URL:', embedUrl);
        
        setSandboxUrl(embedUrl);
      } catch (err) {
        setError('Failed to initialize studio');
        console.error('Sandbox error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initSandbox()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-zinc-900">
      {sandboxUrl ? (
        <iframe 
          src={sandboxUrl}
          className="w-full h-full border-0"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking; fullscreen"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          No sandbox URL available
        </div>
      )}
    </div>
  )
}