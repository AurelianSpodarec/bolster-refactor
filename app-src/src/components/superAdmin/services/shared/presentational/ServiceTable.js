import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import ServiceList from '../presentational/ServiceList';

const ServiceTable = ({ services, headers, isFetching, error }) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!services.length}
        noDataMessage="No services to display"
    >
        <ServiceList colCount={headers.length} services={services} />
    </Table>
);

export default ServiceTable;
