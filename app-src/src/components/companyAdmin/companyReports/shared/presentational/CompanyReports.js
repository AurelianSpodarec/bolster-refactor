import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import CompanyReportsTableContainer from '../containers/CompanyReportsTableContainer';

const CompanyReports = () => (
    <>
        <PageHeading title="Reports" withBackButton />

        <BlockContainer>
            <CompanyReportsTableContainer />
        </BlockContainer>
    </>
);

export default CompanyReports;
