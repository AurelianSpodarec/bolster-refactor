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

export default connect(({ servicesReducer }) => ({
    isFetching: servicesReducer.isFetching,
    error: servicesReducer.error,
    services: servicesReducer.services
}))(ServiceTableContainer);
