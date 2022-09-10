import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import React from 'react';
import CompanyTimesheetsTable from './CompanyTimesheetsTable';

const CompanyTimesheets = () => {
    return (
        <>
            <PageHeading title="Company Timesheets" />
            <BlockContainer>
                <CompanyTimesheetsTable />
            </BlockContainer>
        </>
    );
};

export default CompanyTimesheets;
