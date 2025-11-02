import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions, setEditTransaction } from '../features/transactions/transactionSlice'

function formatDate(d){
  try{
    return new Date(d).toLocaleDateString()
  }catch{return d}
}

export default function TransactionList(){
  const dispatch = useDispatch()
  const { items, status, error, filters } = useSelector(s => s.transactions)

  // Normalize items to an array - some backends return { transactions: [...] } or { data: [...] }
  const txs = Array.isArray(items) ? items : (items && (Array.isArray(items.data) ? items.data : items.transactions)) || []

  useEffect(() => { dispatch(fetchTransactions()) }, [dispatch])

  function applyFilters(list){
    return list.filter(t => {
      if(filters.type !== 'all' && t.type !== filters.type) return false
      if(filters.category && !t.category.toLowerCase().includes(filters.category.toLowerCase())) return false
      if(filters.from && new Date(t.date) < new Date(filters.from)) return false
      if(filters.to && new Date(t.date) > new Date(filters.to)) return false
      return true
    })
  }

  const shown = applyFilters(txs)

  if(status === 'loading' && txs.length === 0) return <div className="p-4">Loading...</div>
  if(error) return <div className="p-4 text-red-600">Error: {String(error)}</div>

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-medium mb-2">Transactions</h3>
      {shown.length === 0 ? (
        <div className="text-sm text-gray-500">No transactions</div>
      ) : (
        <ul className="space-y-2">
          {shown.map(tx => (
            <li 
              key={tx._id || tx.id} 
              className="border-b last:border-b-0 py-3"
              onClick={() => dispatch(setEditTransaction(tx))}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-block px-2 py-0.5 text-xs ${
                      tx.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {tx.type}
                    </span>
                    <span className="font-medium">{tx.category}</span>
                    <span className="text-sm text-gray-500">• {formatDate(tx.date)}</span>
                  </div>
                  <div className="text-sm text-gray-600">{tx.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${
                    tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.amount}
                  </span>
                  <button 
                    className="text-blue-600 hover:text-blue-800" 
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setEditTransaction(tx));
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
