import React from 'react';

import CreditLogsTableContainer from '../containers/CreditLogsTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllCreditLogs = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'Drawing credit logs' }]} />
        <PageHeading title="Drawing credit logs" />
        <CreditLogsTableContainer />
    </div>
);

export default AllCreditLogs;
