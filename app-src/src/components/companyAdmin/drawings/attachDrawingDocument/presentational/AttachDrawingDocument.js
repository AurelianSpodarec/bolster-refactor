import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDrawingDocumentFormContainer from '../containers/AttachDrawingDocumentFormContainer';

const AttachDrawingDocument = () => (
    <div>
        <Breadcrumbs breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <AttachDrawingDocumentFormContainer />
    </div>
);

export default AttachDrawingDocument;
