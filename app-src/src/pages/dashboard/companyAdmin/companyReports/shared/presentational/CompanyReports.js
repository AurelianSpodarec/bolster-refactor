import React from 'react';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import CompanyReportsTableContainer from '../containers/CompanyReportsTableContainer';

const CompanyReports = () => (
    <>
        <PageHeading title="Reports" />

        <BlockContainer>
            <CompanyReportsTableContainer />
        </BlockContainer>
    </>
);

export default CompanyReports;
