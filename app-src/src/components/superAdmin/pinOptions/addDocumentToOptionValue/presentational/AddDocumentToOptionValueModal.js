import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddDocumentToOptionValueFormContainer from '../containers/AddDocumentToOptionValueFormContainer';

const AddDocumentToOptionValueModal = ({ optionValue }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Add Option Value to ${OptionValuesList.name}`} />
        <AddDocumentToOptionValueFormContainer
            optionValue={optionValue}
            buttonText={'Add Option Value'}
        />
    </ModalOuterContainer>
);

export default AddDocumentToOptionValueModal;
