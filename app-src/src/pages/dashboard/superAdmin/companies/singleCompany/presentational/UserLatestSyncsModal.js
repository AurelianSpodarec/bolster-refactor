import React from 'react';

import ModalOuterContainer from 'components_DEPRECATED/shared/generic/modals/containers/ModalOuterContainer';
import UserSyncDataTableContainer from '../containers/UserSyncDataTableContainer';

const UserLatestSyncsModal = ({ id, companyID }) => {
    return (
        <ModalOuterContainer extraClasses="zone-modal">
            <UserSyncDataTableContainer id={id} companyID={companyID} />
        </ModalOuterContainer>
    );
};

export default UserLatestSyncsModal;
