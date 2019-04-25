import React from 'react';

import AttachDocumentFormContainer from 'components/shared/documents/containers/AttachDocumentFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const AttachBuildingDocument = () => (
    <>
        <PageHeading
            leftChildren={true}
            title={'Attach Document'}
            withBackButton
        />
        <AttachDocumentFormContainer hierarchyType="building" />
    </>
);

export default AttachBuildingDocument;
