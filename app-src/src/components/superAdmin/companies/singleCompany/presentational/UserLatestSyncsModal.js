import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import UserSyncDataTableContainer from '../containers/UserSyncDataTableContainer';

const UserLatestSyncsModal = () => {
    return (
        <ModalOuterContainer extraClasses="zone-modal">
            <UserSyncDataTableContainer />
        </ModalOuterContainer>
    );
};

export default UserLatestSyncsModal;
