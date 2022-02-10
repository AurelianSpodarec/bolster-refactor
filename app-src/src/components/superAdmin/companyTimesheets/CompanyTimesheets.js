import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import React from 'react';
import CompanyTimesheetsTable from './CompanyTimesheetsTable';

const CompanyTimesheets = () => {
    return (
        <>
            <PageHeading title="Timesheets" />
            <BlockContainer>
                <CompanyTimesheetsTable />
            </BlockContainer>
        </>
    );
};

export default CompanyTimesheets;
