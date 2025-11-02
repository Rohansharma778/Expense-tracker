import React from 'react'
import Dashboard from './pages/Dashboard'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold">Expense Tracker</h1>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4">
        <Dashboard />
      </main>
    </div>
  )
}
