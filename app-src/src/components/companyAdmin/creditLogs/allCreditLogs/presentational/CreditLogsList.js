import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { CREDIT_LOG_TYPES } from 'constants/companyAdmin/enums';
//! need to put in link to specific invoice id

const CreditLogsList = ({ creditLogs }) =>
    [...creditLogs]
        .sort((a, b) => moment(b.dateAdded) - moment(a.dateAdded))
        .map(({ id, dateAdded, type, quantity }) => (
            <tr key={id}>
                <td>{moment(dateAdded).format('DD/MM/YYYY')}</td>
                <td>{CREDIT_LOG_TYPES[type]}</td>
                <td>{quantity}</td>
                <td>
                    <Link to={'/company/invoices'}>View Invoice</Link>
                </td>
            </tr>
        ));

export default CreditLogsList;
