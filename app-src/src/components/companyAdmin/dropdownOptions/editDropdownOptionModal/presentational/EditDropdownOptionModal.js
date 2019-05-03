import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditDropdownOptionFormContainer from '../containers/EditDropdownOptionFormContainer';

const EditDropdownOptionModal = ({ type, option }) => (
    <ModalOuterContainer>
        <BlockHeading title={'Edit Dropdown Option'} />
        <EditDropdownOptionFormContainer type={type} option={option} />
    </ModalOuterContainer>
);

export default EditDropdownOptionModal;
