import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CreateDocumentForm from './CreateDocumentForm';

const CreateDocumentModal = ({ initialFiles }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading>Upload files</BlockHeading>
            <CreateDocumentForm initialFiles={initialFiles} />
        </ModalOuterContainer>
    );
};

export default CreateDocumentModal;