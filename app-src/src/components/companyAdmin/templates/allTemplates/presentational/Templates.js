import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplatesTableContainer from '../containers/TemplatesTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const Templates = () => (
    <>
        <PageHeading title="My Templates" />
        <BlockContainer>
            <BlockHeading title="Templates" />
            <TemplatesTableContainer />
        </BlockContainer>
    </>
);

export default Templates;
