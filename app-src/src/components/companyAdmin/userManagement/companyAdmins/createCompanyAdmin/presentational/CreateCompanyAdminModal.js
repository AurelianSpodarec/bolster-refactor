import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CreateCompanyAdminFormContainer from '../containers/CreateCompanyAdminFormContainer';

const CreateCompanyAdminModal = () => (
    <ModalOuterContainer>
        <BlockHeading title={'Create Company Admin'} />
        <CreateCompanyAdminFormContainer />
    </ModalOuterContainer>
);

export default CreateCompanyAdminModal;
