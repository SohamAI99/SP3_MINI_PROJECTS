import { useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;

    const newExpense = {
      id: Date.now(),
      desc,
      amount: parseFloat(amount)
    };

    setExpenses([...expenses, newExpense]);
    setDesc('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="app-container">
      <div className="card">
        <h1>Expense Tracker</h1>
        
        <div className="balance-container">
          <h2>Total Expenses</h2>
          <h1 className="total-amount">${total.toFixed(2)}</h1>
        </div>

        <form onSubmit={addExpense} className="expense-form">
          <div className="form-control">
            <label>Description</label>
            <input 
              type="text" 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
              placeholder="e.g., Groceries" 
            />
          </div>
          <div className="form-control">
            <label>Amount ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="e.g., 50.00" 
            />
          </div>
          <button type="submit" className="btn-add">Add Transaction</button>
        </form>

        <div className="history">
          <h3>History</h3>
          <ul className="expense-list">
            {expenses.length === 0 ? <p className="empty">No expenses added yet.</p> : null}
            {expenses.map((expense) => (
              <li key={expense.id} className="expense-item">
                <span>{expense.desc}</span>
                <div className="item-actions">
                  <span className="item-amount">${expense.amount.toFixed(2)}</span>
                  <button onClick={() => deleteExpense(expense.id)} className="btn-delete">x</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
