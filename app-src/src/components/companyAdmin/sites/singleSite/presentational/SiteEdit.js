import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import SiteEditFormContainer from '../containers/SiteEditFormContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SiteEdit = ({ siteName }) => (
    <BlockContainer>
        <BlockHeading title={`Edit ${siteName}`} />
        <SiteEditFormContainer />
    </BlockContainer>
);
export default SiteEdit;
