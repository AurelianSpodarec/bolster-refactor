import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';

import EditBannerNotificationFormContainer from '../containers/EditBannerNotificationFormContainer';

const EditBannerNotificationModal = ({ bannerNotification }) => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit Banner Notification" />
            <EditBannerNotificationFormContainer bannerNotification={bannerNotification} />
        </ModalOuterContainer>
    );
};

export default EditBannerNotificationModal;
