import React from 'react'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import Filters from '../components/Filters'
import Charts from '../components/Charts'
import { useSelector } from 'react-redux'

export default function Dashboard(){
  const { items } = useSelector(s => s.transactions)

  // Normalize items to an array in case the API returned an object or another shape.
  const txs = Array.isArray(items) ? items : (items && (Array.isArray(items.data) ? items.data : items.transactions)) || []

  const totals = txs.reduce((acc, t) => {
    if(t.type === 'income') acc.income += Number(t.amount)
    else acc.expense += Number(t.amount)
    return acc
  }, { income: 0, expense: 0 })

  const balance = totals.income - totals.expense

  return (
    <div className="space-y-4">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Income</div>
          <div className="text-2xl font-bold text-green-600">{totals.income}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Expense</div>
          <div className="text-2xl font-bold text-red-600">{totals.expense}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Balance</div>
          <div className="text-2xl font-bold">{balance}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <TransactionForm />
          <Charts />
        </div>
        <aside className="space-y-4">
          <Filters />
          <TransactionList />
        </aside>
      </section>
    </div>
  )
}
