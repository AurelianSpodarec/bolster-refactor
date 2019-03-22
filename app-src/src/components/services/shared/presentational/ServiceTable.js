import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import ServiceList from '../presentational/ServiceList';

const ServiceTable = ({ services, headers, isFetching, error }) => {
    const servicesArray = Object.values(services);
    return (
        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!servicesArray.length}
            noDataMessage="There are no services to display"
        >
            <ServiceList
                colCount={headers.length}
                servicesArray={servicesArray}
            />
        </Table>
    );
};

export default ServiceTable;
