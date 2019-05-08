import React from 'react';

import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddDropdownOptionFormContainer from '../containers/AddDropdownOptionFormContainer';

const AddDropdownOptionModal = ({ type }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Add ${DROPDOWN_OPTIONS[type].singular}`} />
        <AddDropdownOptionFormContainer
            type={type}
            buttonText={`Add ${DROPDOWN_OPTIONS[type].singular}`}
        />
    </ModalOuterContainer>
);

export default AddDropdownOptionModal;
