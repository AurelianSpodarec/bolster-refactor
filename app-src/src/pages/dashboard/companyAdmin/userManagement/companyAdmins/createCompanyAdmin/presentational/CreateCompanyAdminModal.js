import React from 'react';

import ModalOuterContainer from 'components_DEPRECATED/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import CreateCompanyAdminFormContainer from '../containers/CreateCompanyAdminFormContainer';

const CreateCompanyAdminModal = () => (
    <ModalOuterContainer>
        <BlockHeading title={'Create Admin'} />
        <CreateCompanyAdminFormContainer />
    </ModalOuterContainer>
);

export default CreateCompanyAdminModal;
