import React from 'react';
import CompanyReportsTableContainer from '../containers/CompanyReportsTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const CompanyReportsQueue = () => {
    return (
        <>
            <PageHeading title="Company Reports" />
            <CompanyReportsTableContainer />
        </>
    );
};

export default CompanyReportsQueue;
