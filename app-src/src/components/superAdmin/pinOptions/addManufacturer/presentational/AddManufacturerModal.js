import React from 'react';

import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddManufacturerFormContainer from '../containers/AddManufacturerFormContainer';

const AddManufacturerModal = ({ type }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Add ${DROPDOWN_OPTIONS[type].singular} Manufacturer`} />
        <AddManufacturerFormContainer type={type} buttonText={'Add Manufacturer'} />
    </ModalOuterContainer>
);

export default AddManufacturerModal;
