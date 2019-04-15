import React from 'react';

import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const AttachDrawingDocument = () => (
    <>
        <PageHeading leftChildren={true} title={'Attach Document'}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <AttachDocumentFormContainer hierarchyType="drawing" />
        </BlockContainer>
    </>
);

export default AttachDrawingDocument;
