import React from 'react';

import CreditLogsTableContainer from '../containers/CreditLogsTableContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const AllCreditLogs = ({ isFetching }) => (
    <>
        <PageHeading title="Credit Logs" />
        <BlockContainer isFetching={isFetching}>
            <CreditLogsTableContainer />
        </BlockContainer>
    </>
);

export default AllCreditLogs;
