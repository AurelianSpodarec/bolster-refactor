import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DocumentResponsesTableContainer from '../containers/DocumentResponsesTableContainer';

const DocumentResponses = ({ document }) => (
    <>
        <PageHeading title="Document Responses" />
        <BlockContainer heading={document.name}>
            <DocumentResponsesTableContainer />
        </BlockContainer>
        {/* list of responses, split by operative */}
        {/* each response can open a modal with further information */}
    </>
);

export default DocumentResponses;
