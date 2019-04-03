import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditDocumentFormContainer from 'components/shared/documents/containers/EditDocumentFormContainer';

const EditDrawingDocument = ({
    handleSubmit,
    drawingID,
    documentID,
    backUrl
}) => (
    <div>
        <Breadcrumbs
            // ? what is the route?
            breadcrumbs={[
                { text: '##' },
                { text: 'Drawings' },
                { text: drawingID },
                { text: 'Edit Document' },
                { text: '##' }
            ]}
        />
        <EditDocumentFormContainer
            handleSubmit={handleSubmit}
            documentID={documentID}
            backUrl={backUrl}
        />
    </div>
);

export default EditDrawingDocument;
