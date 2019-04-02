import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import SiteEditFormContainer from '../containers/SiteEditFormContainer';

const SiteEdit = ({ siteName }) => (
    <BlockContainer heading={`Site: ${siteName}`}>
        <SiteEditFormContainer />
    </BlockContainer>
);
export default SiteEdit;
