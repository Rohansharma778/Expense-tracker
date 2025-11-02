import React from 'react'
import { useSelector } from 'react-redux'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'

const COLORS = ['#4ade80','#60a5fa','#f472b6','#f97316','#a78bfa','#f87171']

export default function Charts(){
  const { items } = useSelector(s => s.transactions)

  const txs = Array.isArray(items) ? items : (items && (Array.isArray(items.data) ? items.data : items.transactions)) || []

  const totals = txs.reduce((acc, t) => {
    // Track total by type
    acc[t.type] = (acc[t.type] || 0) + Number(t.amount)
    
    // Track by category for both income and expenses
    acc.byCategory = acc.byCategory || {}
    if (!acc.byCategory[t.category]) {
      acc.byCategory[t.category] = { income: 0, expense: 0 }
    }
    acc.byCategory[t.category][t.type] += Number(t.amount)
    return acc
  }, {})

  const pieData = [
    { name: 'Income', value: totals.income || 0 },
    { name: 'Expense', value: totals.expense || 0 }
  ]

  const barData = Object.entries(totals.byCategory || {}).map(([category, values]) => ({
    category,
    income: values.income,
    expense: values.expense
  })).sort((a, b) => (b.income + b.expense) - (a.income + a.expense))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow h-64">
        <h4 className="font-medium mb-2">Income vs Expense</h4>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
              <Cell fill="#4ade80" /> {/* Green for Income */}
              <Cell fill="#ef4444" /> {/* Red for Expense */}
            </Pie>
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow h-64">
        <h4 className="font-medium mb-2">Category Breakdown</h4>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={barData}>
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
            <Bar dataKey="income" fill="#4ade80" name="Income" /> {/* Green for income */}
            <Bar dataKey="expense" fill="#ef4444" name="Expense" /> {/* Red for expenses */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
