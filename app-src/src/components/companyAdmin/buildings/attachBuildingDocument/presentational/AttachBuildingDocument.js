import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const AttachBuildingDocument = () => (
    <div>
        <Breadcrumb
            breadcrumbs={[
                { text: 'Buildings' },
                { text: 'Building ID' },
                { text: 'Attach Document' }
            ]}
        />
        <AttachDocumentFormContainer hierarchyType="building" />
    </div>
);

export default AttachBuildingDocument;
