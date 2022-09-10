import React from 'react';

import AttachDocumentFormContainer from 'components_DEPRECATED/shared/documents/containers/AttachDocumentFormContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const AttachDrawingDocument = () => (
    <>
        <PageHeading leftChildren={true} title={'Attach Document'} />
        <AttachDocumentFormContainer hierarchyType="drawing" />
    </>
);

export default AttachDrawingDocument;
