import React, { useState } from "react"
import ExpenseForm from "./ExpenseForm"
import "./NewExpense.css"

const NewExpense = (props) => {
  const [addNewExpense, setAddNewExpense] = useState(false)

  const saveExpenseDataHandler = (enteredData) => {
    const expenseData = { ...enteredData, id: Math.random().toString() }
    props.onAddExpense(expenseData)
    setAddNewExpense(false)
  }

  const addExpense = () => {
    setAddNewExpense(true)
  }

  const cancelExpense = () => {
    setAddNewExpense(false)
  }

  return (
    <div className="new-expense">
      {!addNewExpense && <button onClick={addExpense}>Add New Expense</button>}
      {addNewExpense && (
        <ExpenseForm
          onCancel={cancelExpense}
          onSaveExpenseData={saveExpenseDataHandler}
        />
      )}
    </div>
  )
}

export default NewExpense
