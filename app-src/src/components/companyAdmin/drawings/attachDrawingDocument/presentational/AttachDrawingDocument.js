import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const AttachDrawingDocument = () => (
    <>
        <Breadcrumbs
            breadcrumbs={[
                { text: 'Drawings' },
                { text: 'Drawing ID' },
                { text: 'Attach Document' }
            ]}
        />
        <AttachDocumentFormContainer hierarchyType="drawing" />
    </>
);

export default AttachDrawingDocument;
