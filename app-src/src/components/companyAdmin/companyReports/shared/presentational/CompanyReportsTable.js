import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CompanyReportsList from './CompanyReportsList';
import CompanyReportsFiltersContainer from '../containers/CompanyReportsFiltersContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { FETCH_STATUS } from 'constants/companyAdmin/enums';

const CompanyReportsTable = ({
    companyReports,
    headers,
    isFetching,
    error,
    onMobile,
    retryCompanyReport,
    fetchStatus,
    fetchCompanyReportsFull
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
            noDataMessage={
                fetchStatus === FETCH_STATUS.FULL
                    ? 'No company reports to display.'
                    : 'No company reports from the last 7 days to display.'
            }
        >
            <CompanyReportsList
                companyReports={companyReports}
                onMobile={onMobile}
                headers={headers}
                retryCompanyReport={retryCompanyReport}
            />
        </Table>
        {!isFetching && fetchStatus === FETCH_STATUS.PARTIAL ? (
            <ButtonContainer handleClick={fetchCompanyReportsFull}>
                Fetch rest of reports
            </ButtonContainer>
        ) : null}
    </>
);

export default CompanyReportsTable;
