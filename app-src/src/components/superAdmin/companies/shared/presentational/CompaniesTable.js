import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CompaniesList from '../presentational/CompaniesList';

const CompaniesTable = ({ headers, isFetching, error, companies }) => (
    <Table
        withActions
        headers={headers}
        error={error}
        noData={!companies.length}
        isFetching={isFetching}
        noDataMessage="No companies to display"
    >
        <CompaniesList colCount={headers.length} companies={companies} />
    </Table>
);

export default CompaniesTable;
