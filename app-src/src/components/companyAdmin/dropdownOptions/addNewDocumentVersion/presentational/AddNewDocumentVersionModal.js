import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddNewDocumentVersionFormContainer from '../containers/AddNewDocumentVersionFormContainer';

const AddNewDocumentVersionModal = ({ document, optionValueID, manufacturerID }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Add new version to ${document.name}`} />
        <AddNewDocumentVersionFormContainer
            document={document}
            optionValueID={optionValueID}
            buttonText={'Add Version'}
            manufacturerID={manufacturerID}
        />
    </ModalOuterContainer>
);

export default AddNewDocumentVersionModal;
