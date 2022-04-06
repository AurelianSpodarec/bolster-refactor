import React from 'react';

import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddManufacturerFormContainer from '../containers/AddManufacturerFormContainer';

const AddManufacturerModal = ({ type }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Add ${PIN_OPTION_TYPES[type].singular} Manufacturer`} />
        <AddManufacturerFormContainer type={type} buttonText={'Add Manufacturer'} />
    </ModalOuterContainer>
);

export default AddManufacturerModal;
