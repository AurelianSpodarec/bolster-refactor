import React from 'react';
import { connect } from 'react-redux';
import DemoRequestsTable from '../presentational/DemoRequestsTable';

const DemoRequestsTableContainer = ({
    isFetching,
    fetchingError,
    demoRequests
}) => {
    return (
        <DemoRequestsTable
            headers={['Name', 'Company Name', 'Email', 'Phone Number', '']}
            isFetching={isFetching}
            error={fetchingError}
            demoRequests={demoRequests}
        />
    );
};

export default connect(({ superAdmin: { demoRequestsReducer } }) => ({
    isFetching: demoRequestsReducer.isFetching,
    fetchingError: demoRequestsReducer.fetchingError,
    demoRequests: Object.values(demoRequestsReducer.demoRequests),
    filters: demoRequestsReducer.filters
}))(DemoRequestsTableContainer);
