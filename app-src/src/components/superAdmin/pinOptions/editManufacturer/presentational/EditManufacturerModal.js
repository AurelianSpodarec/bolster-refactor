import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditManufacturerFormContainer from '../containers/EditManufacturerFormContainer';

const EditManufacturerModal = ({ manufacturer }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Edit ${manufacturer.name}`} />
        <EditManufacturerFormContainer
            manufacturer={manufacturer}
            buttonText={'Edit Manufacturer'}
            type={manufacturer.pinOptionType}
        />
    </ModalOuterContainer>
);

export default EditManufacturerModal;
