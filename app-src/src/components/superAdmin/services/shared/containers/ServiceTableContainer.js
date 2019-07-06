import React from 'react';
import { connect } from 'react-redux';
import ServiceTable from '../presentational/ServiceTable';

const ServiceTableContainer = ({ isFetching, error, services }) => (
    <ServiceTable
        headers={['Service name', 'Available to companies?', '']}
        isFetching={isFetching}
        error={error}
        services={services}
    />
);

export default connect(
    ({
        superAdmin: {
            adminServicesReducer: { isFetching, error, adminServices }
        }
    }) => ({
        isFetching,
        error,
        services: Object.values(adminServices)
    })
)(ServiceTableContainer);
