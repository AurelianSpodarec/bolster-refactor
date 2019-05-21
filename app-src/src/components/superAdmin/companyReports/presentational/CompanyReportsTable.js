import React from 'react';
import Table from 'components/shared/generic/tables/presentational/Table';
import CompanyReportsListItem from './CompanyReportsListItem';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const CompanyReportsTable = ({
    isFetching,
    error,
    companyReports,
    headers
}) => {
    return (
        <>
            <PageHeading title="Company Reports" />
            <BlockContainer
                heading="Company Reports Queue"
                isFetching={isFetching}
                error={error}
                isEmpty={!!(!companyReports || !companyReports.length)}
            >
                <Table
                    withActions
                    headers={headers}
                    isFetching={isFetching}
                    error={error}
                    noData={!companyReports.length}
                    noDataMessage="Company Reports is empty"
                >
                    {companyReports.map(queueItem => (
                        <CompanyReportsListItem
                            key={queueItem.id}
                            queueItem={queueItem}
                        />
                    ))}
                </Table>
            </BlockContainer>
        </>
    );
};

export default CompanyReportsTable;
