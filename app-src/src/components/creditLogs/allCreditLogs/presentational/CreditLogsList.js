import React from 'react';
import moment from 'moment';

const CreditLogsList = ({ creditLogs }) =>
    [...creditLogs]
        .sort((a, b) => moment(b.dateAdded) - moment(a.dateAdded))
        .map(creditLog => (
            <tr key={creditLog.id}>
                <td>{creditLog.dateAdded}</td>
                <td>{creditLog.name}</td>
                <td>{creditLog.location}</td>
                <td>{creditLog.status}</td>
            </tr>
        ));

export default CreditLogsList;
