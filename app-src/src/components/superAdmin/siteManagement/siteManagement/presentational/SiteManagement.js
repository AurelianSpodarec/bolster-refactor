import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import SiteManagementBlocksContainer from '../containers/SiteManagementBlocksContainer';

const SiteManagement = () => (
    <>
        <PageHeading title="Site management" />
        <SiteManagementBlocksContainer />
    </>
);

export default SiteManagement;
