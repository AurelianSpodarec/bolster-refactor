import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import UserSyncDataTableContainer from '../containers/UserSyncDataTableContainer';

const UserLatestSyncsModal = ({ id }) => {
    return (
        <ModalOuterContainer extraClasses="zone-modal">
            <UserSyncDataTableContainer id={id} />
        </ModalOuterContainer>
    );
};

export default UserLatestSyncsModal;
