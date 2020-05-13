import React from 'react';

import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import AddOptionValueFormContainer from '../containers/AddOptionValueFormContainer';

const AddOptionValueModal = ({ type }) => (
    <ModalOuterContainer>
        <BlockHeading title={`Add ${DROPDOWN_OPTIONS[type].singular} Option Value`} />
        <AddOptionValueFormContainer type={type} buttonText={'Add Option Value'} />
    </ModalOuterContainer>
);

export default AddOptionValueModal;
