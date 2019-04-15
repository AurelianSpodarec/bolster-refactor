import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import SiteEditFormContainer from '../containers/SiteEditFormContainer';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SiteEdit = ({ siteName }) => (
    <>
        <PageHeading leftChildren={true} title={`Edit: ${siteName}`}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <BlockHeading title="Edit Site Details" />
            <SiteEditFormContainer />
        </BlockContainer>
    </>
);
export default SiteEdit;
