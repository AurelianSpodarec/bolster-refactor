import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import SiteManagementBlocksContainer from '../containers/SiteManagementBlocksContainer';

const SiteManagement = () => (
    <>
        <PageHeading title="Site management" withBackButton />
        <SiteManagementBlocksContainer />
    </>
);

export default SiteManagement;
