import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddOptionValueFormContainer from '../containers/AddOptionValueFormContainer';

const AddOptionValueModal = ({ manufacturer, services }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Add Option Value to ${manufacturer.name}`} />
        <AddOptionValueFormContainer
            services={Object.values(services)}
            manufacturer={manufacturer}
            buttonText={'Add Option Value'}
        />
    </ModalOuterContainer>
);

export default AddOptionValueModal;
