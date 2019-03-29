import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const AttachSiteDocument = ({ handleSubmit }) => (
    <div>
        <Breadcrumbs breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <AttachDocumentFormContainer handleSubmit={handleSubmit} />
    </div>
);

export default AttachSiteDocument;
