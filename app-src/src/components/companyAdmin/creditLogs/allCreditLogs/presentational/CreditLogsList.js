import React from 'react';
import moment from 'moment';
import { CREDIT_LOG_TYPES } from 'constants/companyAdmin/enums';

const CreditLogsList = ({ creditLogs }) =>
    [...creditLogs]
        .sort((a, b) => moment(b.dateAdded) - moment(a.dateAdded))
        .map(({ id, dateAdded, type, quantity }) => (
            <tr key={id}>
                <td>{moment(dateAdded).format('DD/MM/YYYY')}</td>
                <td>{CREDIT_LOG_TYPES[type]}</td>
                <td>{quantity}</td>
            </tr>
        ));

export default CreditLogsList;
