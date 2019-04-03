import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const AttachFloorDocument = ({ handleSubmit, backUrl, floorID }) => (
    <div>
        <Breadcrumbs
            breadcrumbs={[
                { text: 'Floors' },
                { text: floorID },
                { text: 'Attach Document' }
            ]}
        />
        <AttachDocumentFormContainer
            handleSubmit={handleSubmit}
            backUrl={backUrl}
        />
    </div>
);

export default AttachFloorDocument;
