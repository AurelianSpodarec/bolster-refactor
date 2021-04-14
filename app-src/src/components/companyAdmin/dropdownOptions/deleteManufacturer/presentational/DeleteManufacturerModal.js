import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DeleteManufacturerFormContainer from '../containers/DeleteManufacturerFormContainer';

const DeleteManufacturerModal = ({ id }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Delete'} />
        <DeleteManufacturerFormContainer id={id} />
    </ModalOuterContainer>
);

export default DeleteManufacturerModal;
