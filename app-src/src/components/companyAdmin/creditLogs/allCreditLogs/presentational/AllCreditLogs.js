import React from 'react';
import { connect } from 'react-redux';

import CreditLogsTableContainer from '../containers/CreditLogsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AllCreditLogs = ({ isFetching }) => (
    <>
        <PageHeading title="Credit Logs" />
        <BlockContainer isFetching={isFetching}>
            <CreditLogsTableContainer />
        </BlockContainer>
    </>
);

const mapStateToProps = ({ companyAdmin: { creditLogsReducer } }) => ({
    isFetching: creditLogsReducer.isFetching,
    error: creditLogsReducer.error
});

export default connect(mapStateToProps)(AllCreditLogs);
