import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditOptionValueDocumentFormContainer from '../containers/EditOptionValueDocumentFormContainer';

const EditOptionValueDocumentModal = ({ optionValueID, document }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Edit ${document.name}`} />
        <EditOptionValueDocumentFormContainer
            optionValueID={optionValueID}
            document={document}
            buttonText={'Confirm'}
        />
    </ModalOuterContainer>
);

export default EditOptionValueDocumentModal;
