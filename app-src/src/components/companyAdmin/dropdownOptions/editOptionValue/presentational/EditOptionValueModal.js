import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditOptionValueFormContainer from '../containers/EditOptionValueFormContainer';

const EditOptionValueModal = ({ optionValue, services }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Edit ${optionValue.name}`} />
        <EditOptionValueFormContainer
            optionValue={optionValue}
            services={services}
            buttonText={'Confirm'}
        />
    </ModalOuterContainer>
);

export default EditOptionValueModal;
