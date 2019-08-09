import React from 'react';
import moment from 'moment';

import CreditLogsListItem from './CreditLogListItem';

const CreditLogsList = ({ creditLogs }) =>
    [...creditLogs]
        .sort((a, b) => moment(a.dateAdded) - moment(b.dateAdded))
        .map(item => <CreditLogsListItem key={item.id} item={item} />);

export default CreditLogsList;
