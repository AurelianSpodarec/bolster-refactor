import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const AttachDrawingDocument = ({ handleSubmit, backUrl, drawingID }) => (
    <div>
        <Breadcrumbs
            breadcrumbs={[
                { text: 'Drawings' },
                { text: drawingID },
                { text: 'Attach Document' }
            ]}
        />
        <AttachDocumentFormContainer
            handleSubmit={handleSubmit}
            backUrl={backUrl}
        />
    </div>
);

export default AttachDrawingDocument;
