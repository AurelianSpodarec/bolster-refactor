import React from 'react';

import { formatCurrency } from 'helpers/generic';

const ExpensesList = ({ expenses = [], expensesTotal, currencySymbol = '£' }) => (
    <>
        {expenses.map((expense, i) => {
            return (
                <tr key={i}>
                    <td>{expense.name}</td>
                    <td>
                        {currencySymbol}
                        {expense.price ? formatCurrency(expense.price) : '0.00'}
                    </td>
                </tr>
            );
        })}
        <tr>
            <td>Total</td>
            <td>
                {currencySymbol}
                {formatCurrency(expensesTotal)}
            </td>
        </tr>
    </>
);

export default ExpensesList;
