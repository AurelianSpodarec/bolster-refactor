import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import HeadquartersCompaniesList from './HeadquartersCompaniesList';

const HeadquartersCompaniesTable = ({
    companies,
    error,
    isFetching,
    headers
}) => {
    return (
        <Table
            withActions
            noData={!companies.length}
            noDataMessage="You have no companies to view."
            error={error}
            isFetching={isFetching}
            headers={headers}
        >
            <HeadquartersCompaniesList companies={companies} />
        </Table>
    );
};

export default HeadquartersCompaniesTable;
