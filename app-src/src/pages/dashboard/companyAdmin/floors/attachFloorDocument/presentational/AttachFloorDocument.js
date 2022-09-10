import React from 'react';

import AttachDocumentFormContainer from 'components_DEPRECATED/shared/documents/containers/AttachDocumentFormContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const AttachFloorDocument = () => (
    <>
        <PageHeading leftChildren={true} title={'Attach Document'} withBackButton />
        <AttachDocumentFormContainer hierarchyType="floor" />
    </>
);

export default AttachFloorDocument;
