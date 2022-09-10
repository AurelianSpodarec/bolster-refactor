import React from 'react';

import { formatCurrency } from 'helpers/generic';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import RemoveExpenseButton from './RemoveExpenseButton';

const ExpensesList = ({ expenses = [], expensesTotal, currencySymbol = '£', shiftID }) => {
    return (
        <>
            {expenses.map((expense, i) => {
                return (
                    <tr key={i}>
                        <td>{expense.name}</td>
                        <td>
                            {currencySymbol}
                            {expense.price ? formatCurrency(expense.price) : '0.00'}
                        </td>
                        <td>
                            <ButtonWrapper alignment="right">
                                <RemoveExpenseButton shiftID={shiftID} expenseID={expense.id} />
                            </ButtonWrapper>
                        </td>
                    </tr>
                );
            })}
            <tr>
                <td>Total</td>
                <td>
                    {currencySymbol}
                    {expensesTotal ? formatCurrency(expensesTotal) : '0.00'}
                </td>
            </tr>
        </>
    );
};

export default ExpensesList;
