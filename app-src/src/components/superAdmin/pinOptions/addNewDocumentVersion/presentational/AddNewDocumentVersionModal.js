import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddNewDocumentVersionFormContainer from '../containers/AddNewDocumentVersionFormContainer';

const AddNewDocumentVersionModal = ({ document }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Add new version to ${document.name}`} />
        <AddNewDocumentVersionFormContainer document={document} buttonText={'Add Version'} />
    </ModalOuterContainer>
);

export default AddNewDocumentVersionModal;
