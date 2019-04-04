import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const AttachFloorDocument = () => (
    <>
        <Breadcrumbs
            breadcrumbs={[
                { text: 'Floors' },
                { text: 'Floor ID' },
                { text: 'Attach Document' }
            ]}
        />
        <AttachDocumentFormContainer hierarchyType="floor" />
    </>
);

export default AttachFloorDocument;
