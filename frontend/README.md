# Expense Tracker Frontend

This is a beginner-friendly React frontend for the Expense Tracker application.

Features

- Dashboard with total income, total expense, and balance
- Add transaction form (type, amount, category, description, date)
- Filters by type, category, and date range
- Charts (pie and bar) using Recharts
- Redux Toolkit for state and async API calls to `/api/transactions`
- Tailwind CSS for styling

Quick start (PowerShell)

```powershell
cd "c:\Users\Rohan\Desktop\expense tracker\frontend"
npm install
npm run dev
```

Notes

- The frontend expects the backend API root at `/api/transactions` (same origin). If your backend runs on a different port during development, use a proxy in Vite config or run both servers on same origin.
- Basic validation and loading/error states are implemented in the form and Redux slice.
