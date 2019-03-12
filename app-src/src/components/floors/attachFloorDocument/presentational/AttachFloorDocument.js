import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachFloorDocumentFormContainer from '../containers/AttachFloorDocumentFormContainer';

const AttachFloorDocument = () => (
    <div>
        <Breadcrumbs breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <AttachFloorDocumentFormContainer />
    </div>
);

export default AttachFloorDocument;
