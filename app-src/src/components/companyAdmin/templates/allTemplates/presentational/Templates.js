import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplatesTableContainer from '../containers/TemplatesTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import PinOptionsTableContainer from '../containers/PinOptionsTableContainer';

const Templates = () => (
    <>
        <PageHeading title="My Templates" withBackButton />
        <BlockContainer>
            <BlockHeading title="Templates" />
            <TemplatesTableContainer />
        </BlockContainer>
        <PinOptionsTableContainer />
    </>
);

export default Templates;
