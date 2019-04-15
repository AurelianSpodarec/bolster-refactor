import React from 'react';

import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';

const AttachDrawingDocument = () => (
    <>
        <PageHeading leftChildren={true} title={'Attach Document'}>
            <BackButtonContainer />
        </PageHeading>
        <AttachDocumentFormContainer hierarchyType="drawing" />
    </>
);

export default AttachDrawingDocument;
