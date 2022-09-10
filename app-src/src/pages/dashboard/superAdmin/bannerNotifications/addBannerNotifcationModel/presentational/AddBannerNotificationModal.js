import React from 'react';

import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components_DEPRECATED/shared/generic/modals/containers/ModalOuterContainer';
import AddBannerNotificationFormContainer from '../containers/AddBannerNotificationFormContainer';

const AddBannerNotificationModal = () => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Add New Banner Notification" />
            <AddBannerNotificationFormContainer />
        </ModalOuterContainer>
    );
};

export default AddBannerNotificationModal;
