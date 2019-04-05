import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditDocumentFormContainer from 'components/shared/documents/containers/EditDocumentFormContainer';

const EditFloorDocument = () => (
    <>
        <Breadcrumbs
            // ? what is the route?
            breadcrumbs={[
                { text: '##' },
                { text: 'Drawings' },
                { text: 'Drawing ID' },
                { text: 'Edit Document' },
                { text: '##' }
            ]}
        />
        <EditDocumentFormContainer hierarchyType="Drawing" />
    </>
);

export default EditFloorDocument;
