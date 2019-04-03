import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const AttachBuildingDocument = ({ handleSubmit, backUrl, buildingID }) => (
    <div>
        <Breadcrumb
            breadcrumbs={[
                { text: 'Buildings' },
                { text: buildingID },
                { text: 'Attach Document' }
            ]}
        />
        <AttachDocumentFormContainer
            handleSubmit={handleSubmit}
            backUrl={backUrl}
        />
    </div>
);

export default AttachBuildingDocument;
