'use client'

import { useState } from 'react'

export default function StaticTestPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Static Test Page</h1>
        <p className="text-lg mb-4">This page tests basic React state management without any async operations.</p>
        
        <div className="bg-white p-6 rounded-sm border">
          <h2 className="text-xl font-semibold mb-4">Counter Test</h2>
          <p className="mb-4">Count: {count}</p>
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-sm hover:bg-primary/90"
          >
            Increment
          </button>
        </div>

        <div className="mt-8 bg-green-50 p-6 rounded-sm border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Success!</h2>
          <p className="text-green-700">
            If you can see this page and the counter works, React hydration is functioning correctly.
            The issue is specifically with async operations in useEffect hooks.
          </p>
        </div>
      </div>
    </div>
  )
}
