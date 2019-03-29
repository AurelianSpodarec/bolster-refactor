import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';

const AttachSiteDocument = ({ handleSubmit, backUrl }) => (
    <div>
        <Breadcrumbs breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <AttachDocumentFormContainer
            handleSubmit={handleSubmit}
            backUrl={backUrl}
        />
    </div>
);

export default AttachSiteDocument;
