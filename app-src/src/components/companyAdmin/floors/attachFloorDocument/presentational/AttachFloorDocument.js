import React from 'react';

import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AttachFloorDocument = () => (
    <>
        <PageHeading
            leftChildren={true}
            title={'Attach Document'}
            withBackButton
        />
        <AttachDocumentFormContainer hierarchyType="floor" />
    </>
);

export default AttachFloorDocument;
