import React from 'react';

import CreditLogsListContainer from '../containers/CreditLogsListContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllCreditLogs = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'Drawing credit logs' }]} />
        <PageHeading title="Drawing credit logs" />
        <CreditLogsListContainer />
    </div>
);

export default AllCreditLogs;
