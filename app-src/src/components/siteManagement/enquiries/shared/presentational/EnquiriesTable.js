import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import EnquiriesList from '../presentational/EnquiriesList';

const EnquiriesTable = ({ headers, isFetching, error, enquiries }) => (
    <Table
        withActions
        headers={headers}
        isFetching={isFetching}
        error={error}
        noData={!enquiries.length}
        noDataMessage="There are no enquiries to display"
    >
        <EnquiriesList colCount={headers.length} enquiries={enquiries} />
    </Table>
);

export default EnquiriesTable;
