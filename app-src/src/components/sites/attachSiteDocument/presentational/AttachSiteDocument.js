import React from 'react';

import Breadcrumbs from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AttachSiteDocumentFormContainer from '../containers/AttachSiteDocumentFormContainer';

const AttachSiteDocument = () => (
    <div>
        <Breadcrumbs breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <AttachSiteDocumentFormContainer />
    </div>
);

export default AttachSiteDocument;
