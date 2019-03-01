import React from 'react';

const CreditLogsList = ({ creditLogs }) =>
    creditLogs.map(creditLog => (
        <tr key={creditLog.id}>
            <td>{creditLog.datedAdded}</td>
            <td>{creditLog.name}</td>
            <td>{creditLog.location}</td>
            <td>{creditLog.status}</td>
        </tr>
    ));

export default CreditLogsList;
