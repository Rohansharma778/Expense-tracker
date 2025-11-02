import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction, updateTransaction, clearEditTransaction } from '../features/transactions/transactionSlice'

export default function TransactionForm(){
  const dispatch = useDispatch()
  const { status, editingTransaction } = useSelector(s => s.transactions)
  const [form, setForm] = useState({ type: 'expense', amount: '', category: '', description: '', date: '' })
  const [errors, setErrors] = useState({})

  // When editingTransaction changes, update form
  useEffect(() => {
    if (editingTransaction) {
      setForm({
        type: editingTransaction.type,
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        description: editingTransaction.description,
        date: editingTransaction.date.split('T')[0]
      })
    }
  }, [editingTransaction])

  function validate(){
    const e = {}
    if(!form.amount || Number.isNaN(Number(form.amount)) ) e.amount = 'Enter a valid amount'
    if(!form.category) e.category = 'Category required'
    if(!form.date) e.date = 'Date required'
    if(!form.description) e.description = 'Description required'
    return e
  }

  async function onSubmit(ev){
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if(Object.keys(e).length) return

    const payload = { ...form, amount: Number(form.amount) }
    try {
      if (editingTransaction) {
        // Update existing transaction
        await dispatch(updateTransaction({ ...payload, _id: editingTransaction._id })).unwrap()
        dispatch(clearEditTransaction())
      } else {
        // Add new transaction
        await dispatch(addTransaction(payload)).unwrap()
      }
      // Reset form
      setForm({ type: 'expense', amount: '', category: '', description: '', date: '' })
      setErrors({})
    } catch(err) {
      setErrors({ submit: err?.message || 'Failed to save' })
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow space-y-3">
      <div className="flex gap-2">
        <label className="flex-1">
          <div className="text-sm font-medium">Type</div>
          <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="form-input">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="flex-1">
          <div className="text-sm font-medium">Amount</div>
          <input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="form-input" />
          {errors.amount && <div className="text-red-500 text-xs">{errors.amount}</div>}
        </label>
      </div>

      <label>
        <div className="text-sm font-medium">Category</div>
        <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="form-input" />
        {errors.category && <div className="text-red-500 text-xs">{errors.category}</div>}
      </label>

      <label>
        <div className="text-sm font-medium">Description</div>
        <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="form-input" />
        {errors.description && <div className="text-red-500 text-xs">{errors.description}</div>}
      </label>

      <label>
        <div className="text-sm font-medium">Date</div>
        <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="form-input" />
        {errors.date && <div className="text-red-500 text-xs">{errors.date}</div>}
      </label>

      {errors.submit && <div className="text-red-600">{errors.submit}</div>}

      <div className="flex justify-end gap-2">
        {editingTransaction && (
          <button
            type="button"
            onClick={() => {
              dispatch(clearEditTransaction())
              setForm({ type: 'expense', amount: '', category: '', description: '', date: '' })
            }}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
        <button 
          type="submit" 
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700" 
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Saving...' : editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </div>
    </form>
  )
}
