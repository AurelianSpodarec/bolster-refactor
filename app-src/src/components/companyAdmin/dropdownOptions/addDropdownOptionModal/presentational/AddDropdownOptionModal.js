import React from 'react';

import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddDropdownOptionFormContainer from '../containers/AddDropdownOptionFormContainer';

const AddDropdownOptionModal = ({ type }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Add ${PIN_OPTION_TYPES[type].singular}`} />
        <AddDropdownOptionFormContainer
            type={type}
            buttonText={`Add ${PIN_OPTION_TYPES[type].singular}`}
        />
    </ModalOuterContainer>
);

export default AddDropdownOptionModal;
