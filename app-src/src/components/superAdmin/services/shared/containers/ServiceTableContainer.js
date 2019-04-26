import React from 'react';
import { connect } from 'react-redux';
import ServiceTable from '../presentational/ServiceTable';

const ServiceTableContainer = ({ isFetching, error, services }) => (
    <ServiceTable
        headers={['Service name', '']}
        isFetching={isFetching}
        error={error}
        services={Object.values(services)}
    />
);

export default connect(({ superAdmin: { adminServicesReducer } }) => ({
    isFetching: adminServicesReducer.isFetching,
    error: adminServicesReducer.error,
    services: adminServicesReducer.adminServices
}))(ServiceTableContainer);
