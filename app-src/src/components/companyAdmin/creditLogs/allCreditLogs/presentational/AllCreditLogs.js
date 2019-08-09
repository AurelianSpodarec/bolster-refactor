import React from 'react';

import CreditLogsTableContainer from '../containers/CreditLogsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllCreditLogs = ({ isFetching }) => (
    <>
        <PageHeading title="Credit Logs" withBackButton />
        <BlockContainer isFetching={isFetching}>
            <CreditLogsTableContainer />
        </BlockContainer>
    </>
);

export default AllCreditLogs;
