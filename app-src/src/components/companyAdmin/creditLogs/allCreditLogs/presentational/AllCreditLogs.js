import React from 'react';
import { connect } from 'react-redux';

import CreditLogsTableContainer from '../containers/CreditLogsTableContainer';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const AllCreditLogs = ({ isFetching, creditLogs, error }) => (
    <>
        <Breadcrumb breadcrumbs={[{ text: '##Drawing credit logs##' }]} />
        <BlockContainer
            isFetching={isFetching}
            isEmpty={!creditLogs.length}
            error={error}
            heading="Drawing Credit Logs"
        >
            <CreditLogsTableContainer />
        </BlockContainer>
    </>
);

const mapStateToProps = ({ companyAdmin: { creditLogsReducer } }) => ({
    creditLogs: Object.values(creditLogsReducer.creditLogs) || [],
    isFetching: creditLogsReducer.isFetching,
    error: creditLogsReducer.error
});

export default connect(mapStateToProps)(AllCreditLogs);
