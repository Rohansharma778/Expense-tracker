# Expense Tracker Application

A full-stack expense tracking application built with React, Redux, Node.js, Express, and MongoDB. This application helps users track their income and expenses with features like transaction management, filtering, and visualization through charts.

## Features

- Add, edit, and delete transactions
- Categorize transactions as income or expense
- Filter transactions by type and date
- Visualize spending patterns through charts
- Responsive design for mobile and desktop

## Technology Stack

### Frontend

- React.js
- Redux Toolkit for state management
- Tailwind CSS for styling
- Recharts for data visualization

### Backend

- Node.js
- Express.js
- MongoDB for database
- Mongoose ODM (mongoose)

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- Git

### Clone the Repository

```bash
git clone https://github.com/Rohansharma778/Expense-tracker.git
cd Expense-tracker
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (if needed) in a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=8000
```

4. Start the backend server:

```bash
npm start
```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:5173`

## Usage

1. Add a new transaction using the form at the top of the dashboard
2. View all transactions in the list below
3. Edit or delete transactions using the buttons next to each transaction
4. Use the filters to sort and filter transactions
5. View spending patterns in the charts section

## API Endpoints

### Transactions

- GET `/api/transactions` - Get all transactions
- POST `/api/transactions` - Create a new transaction
- PUT `/api/transactions/:id` - Update a transaction
- DELETE `/api/transactions/:id` - Delete a transaction

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Rohan Sharma - [GitHub](https://github.com/Rohansharma778)
