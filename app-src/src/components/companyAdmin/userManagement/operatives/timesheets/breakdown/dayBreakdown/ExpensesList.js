import React from 'react';

import { formatCurrency } from 'helpers/generic';

const ExpensesList = ({ expenses = [], expensesTotal }) => (
    <>
        {expenses.map((expense, i) => {
            return (
                <tr key={i}>
                    <td>{expense.name}</td>
                    <td>{formatCurrency(expense.cost)}</td>
                </tr>
            );
        })}
        <tr>
            <td>Total</td>
            <td>{formatCurrency(expensesTotal)}</td>
        </tr>
    </>
);

export default ExpensesList;
