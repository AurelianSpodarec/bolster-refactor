import React from 'react';
import Table from 'components_DEPRECATED/shared/generic/tables/presentational/Table';
import CompanyReportsList from './CompanyReportsList';
import CompanyReportsFiltersContainer from '../containers/CompanyReportsFiltersContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import { FETCH_STATUS } from 'constants/companyAdmin/enums';
import ButtonContainer from 'components_DEPRECATED/shared/generic/button/containers/ButtonContainer';

const CompanyReportsTable = ({
    companyReports,
    headers,
    isFetching,
    error,
    onMobile,
    fetchStatus,
    fetchClientCompanyReportsFull,
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
            noDataMessage="No company reports to display."
        >
            <CompanyReportsList
                companyReports={companyReports}
                onMobile={onMobile}
                headers={headers}
            />
        </Table>
        {!isFetching && fetchStatus === FETCH_STATUS.PARTIAL ? (
            <ButtonContainer handleClick={fetchClientCompanyReportsFull}>
                Fetch rest of reports
            </ButtonContainer>
        ) : null}
    </>
);

export default CompanyReportsTable;
