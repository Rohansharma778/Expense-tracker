import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE = 'http://localhost:8000/api'

export const fetchTransactions = createAsyncThunk('transactions/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(API_BASE)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

export const addTransaction = createAsyncThunk('transactions/add', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(API_BASE, payload)
    return res.data
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message)
  }
})

export const updateTransaction = createAsyncThunk(
  'transactions/update',
  async (transaction, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/${transaction._id}`, transaction)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
)

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filters: { type: 'all', category: '', from: '', to: '' },
    editingTransaction: null
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    setEditTransaction(state, action) {
      state.editingTransaction = action.payload
    },
    clearEditTransaction(state) {
      state.editingTransaction = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(fetchTransactions.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        // Handle the wrapped response format
        state.items = action.payload.transaction || [];
      })
      .addCase(fetchTransactions.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload })
      .addCase(addTransaction.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(addTransaction.fulfilled, (state, action) => { 
        state.status = 'succeeded';
        // Ensure items is always an array before unshift
        if (!Array.isArray(state.items)) {
          state.items = [];
        }
        state.items.unshift(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload })
      .addCase(updateTransaction.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.items.findIndex(tx => tx._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        state.editingTransaction = null
      })
      .addCase(updateTransaction.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload })
  }
})

export const { setFilters, setEditTransaction, clearEditTransaction } = transactionSlice.actions
export default transactionSlice.reducer
