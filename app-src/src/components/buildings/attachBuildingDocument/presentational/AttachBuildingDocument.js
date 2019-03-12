import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachBuildingDocumentFormContainer from '../containers/AttachBuildingDocumentFormContainer';

const AttachBuildingDocument = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <AttachBuildingDocumentFormContainer />
    </div>
);

export default AttachBuildingDocument;
