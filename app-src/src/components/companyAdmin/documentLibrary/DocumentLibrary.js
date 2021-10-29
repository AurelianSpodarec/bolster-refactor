import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const DocumentLibrary = () => (
    <>
        <PageHeading title="Document Library" withBackButton />

        <BlockContainer>
            <div>Filters</div>
        </BlockContainer>

        <BlockContainer>
            <div>Files Table</div>
        </BlockContainer>
    </>
);

export default DocumentLibrary;
