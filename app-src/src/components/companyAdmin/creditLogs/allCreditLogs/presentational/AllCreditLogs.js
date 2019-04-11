import React from 'react';

import CreditLogsTableContainer from '../containers/CreditLogsTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const AllCreditLogs = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'Drawing credit logs' }]} />
        <CreditLogsTableContainer />
    </div>
);

export default AllCreditLogs;
