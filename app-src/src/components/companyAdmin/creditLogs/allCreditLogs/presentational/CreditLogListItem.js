import React from 'react';
import moment from 'moment';

import CreditLogsListItem from './CreditLogsList';

//! need to put in link to specific invoice id

const CreditLogsList = ({ creditLogs }) =>
    [...creditLogs]
        .sort((a, b) => moment(b.dateAdded) - moment(a.dateAdded))
        .map(item => <CreditLogsListItem key={item.id} item={item} />);

export default CreditLogsList;
