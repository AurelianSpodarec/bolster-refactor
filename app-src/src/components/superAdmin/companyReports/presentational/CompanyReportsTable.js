import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CompanyReportsListItem from './CompanyReportsListItem';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import CompanyReportsFiltersContainer from '../containers/CompanyReportsFiltersContainer';

const CompanyReportsTable = ({
    isFetching,
    error,
    companyReports,
    headers,
    onMobile
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
                    noDataMessage="No company reports to display."
                >
                    {companyReports.map(queueItem => (
                        <CompanyReportsListItem
                            key={queueItem.id}
                            queueItem={queueItem}
                            headers={headers}
                            onMobile={onMobile}
                        />
                    ))}
                </Table>
            </BlockContainer>
        </>
    );
};

export default CompanyReportsTable;
