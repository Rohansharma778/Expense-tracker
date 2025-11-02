import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../features/transactions/transactionSlice'

export default function Filters(){
  const dispatch = useDispatch()
  const { filters } = useSelector(s => s.transactions)

  function onChange(key, val){
    dispatch(setFilters({ [key]: val }))
  }

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h4 className="font-medium">Filters</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <select value={filters.type} onChange={e => onChange('type', e.target.value)} className="form-input">
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input value={filters.category} onChange={e => onChange('category', e.target.value)} placeholder="Category" className="form-input" />

        <div className="flex gap-4">
          <input type="date" value={filters.from} onChange={e => onChange('from', e.target.value)} className="form-input" />
        </div>
      </div>
    </div>
  )
}
