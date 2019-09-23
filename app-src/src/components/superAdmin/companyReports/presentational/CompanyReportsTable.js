import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CompanyReportsListItem from './CompanyReportsListItem';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import CompanyReportsFiltersContainer from '../containers/CompanyReportsFiltersContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { FETCH_STATUS } from 'constants/companyAdmin/enums';

const CompanyReportsTable = ({
    isFetching,
    error,
    companyReports,
    headers,
    onMobile,
    retryCompanyReport,
    fetchStatus,
    fetchCompanyReportsQueueFull
}) => {
    return (
        <>
            <BlockContainer
                heading="Company Reports Queue"
                isFetching={isFetching}
                error={error}
                isEmpty={!!(!companyReports || !companyReports.length)}
            >
                <CompanyReportsFiltersContainer />
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
                    {companyReports.map(queueItem => (
                        <CompanyReportsListItem
                            key={queueItem.id}
                            queueItem={queueItem}
                            headers={headers}
                            onMobile={onMobile}
                            retryCompanyReport={retryCompanyReport}
                        />
                    ))}
                </Table>
            </BlockContainer>
            {!isFetching && fetchStatus === FETCH_STATUS.PARTIAL ? (
                <ButtonContainer handleClick={fetchCompanyReportsQueueFull}>
                    Fetch rest of reports
                </ButtonContainer>
            ) : null}
        </>
    );
};

export default CompanyReportsTable;
