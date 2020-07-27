import React from 'react';
import { connect } from 'react-redux';
import DemoRequestsTable from '../presentational/DemoRequestsTable';
import { sortArrayByField } from 'helpers/generic';

const DemoRequestsTableContainer = ({ isFetching, fetchingError, demoRequests }) => {
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
    demoRequests: sortArrayByField(Object.values(demoRequestsReducer.demoRequests), 'createdOn'),
    filters: demoRequestsReducer.filters,
}))(DemoRequestsTableContainer);
