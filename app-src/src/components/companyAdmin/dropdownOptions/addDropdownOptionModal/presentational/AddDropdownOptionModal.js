import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddDropdownOptionFormContainer from '../containers/AddDropdownOptionFormContainer';

const AddDropdownOptionModal = ({ type }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Add Dropdown Option'} />
        <AddDropdownOptionFormContainer type={type} />
    </ModalOuterContainer>
);

export default AddDropdownOptionModal;
