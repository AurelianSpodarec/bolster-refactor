import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import EnquiriesList from '../presentational/EnquiriesList';

const EnquiriesTable = ({ headers, isFetching, error, enquiries }) => (
    <Table
        withActions
        headers={headers}
        error={error}
        noData={!enquiries.length}
        isFetching={isFetching}
        noDataMessage="No enquiries to display"
    >
        <EnquiriesList colCount={headers.length} enquiries={enquiries} />
    </Table>
);

export default EnquiriesTable;
