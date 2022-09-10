import React from 'react';

import ModalOuterContainer from 'components_DEPRECATED/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import CreateDocumentForm from './CreateDocumentForm';

const CreateDocumentModal = ({ initialFiles }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Upload files" />
            <CreateDocumentForm initialFiles={initialFiles} />
        </ModalOuterContainer>
    );
};

export default CreateDocumentModal;
