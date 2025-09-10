'use client'

import { useState, useEffect } from 'react'

export default function UseEffectTestPage() {
  const [message, setMessage] = useState('Initial message')
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('useEffect running - setting message')
    setMessage('useEffect executed successfully!')
  }, [])

  useEffect(() => {
    console.log('useEffect with dependency running')
    setCount(count + 1)
  }, [count])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">useEffect Test Page</h1>
      <p className="text-lg mb-4">Message: {message}</p>
      <p className="text-lg mb-4">Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-sm hover:bg-primary/90"
      >
        Increment Count
      </button>
    </div>
  )
}
