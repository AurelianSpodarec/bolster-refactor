import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditDocumentFormContainer from 'components/shared/documents/containers/EditDocumentFormContainer';

const EditFloorDocument = ({ handleSubmit, floorID, documentID, backUrl }) => (
    <div>
        <Breadcrumbs
            // ? what is the route?
            breadcrumbs={[
                { text: '##' },
                { text: 'Floors' },
                { text: floorID },
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

export default EditFloorDocument;
