import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CompanyReportsList from './CompanyReportsList';
import CompanyReportsFiltersContainer from '../containers/CompanyReportsFiltersContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CompanyReportsTable = ({
    companyReports,
    headers,
    isFetching,
    error
}) => (
    <>
        <BlockHeading title="Reports Table">
            <CompanyReportsFiltersContainer />
        </BlockHeading>

        <Table
            withActions
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!companyReports.length}
            noDataMessage="Company Reports is empty"
        >
            <CompanyReportsList companyReports={companyReports} />
        </Table>
    </>
);

export default CompanyReportsTable;
