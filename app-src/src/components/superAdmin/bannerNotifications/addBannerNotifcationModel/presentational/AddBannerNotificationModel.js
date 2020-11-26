import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import AddBannerNotificationFormContainer from '../containers/AddBannerNotificationFormContainer';

const AddBannerNotificationModel = () => {
    return (
        <ModalOuterContainer>
            <BlockHeading title="Add New Banner Notification" />
            <AddBannerNotificationFormContainer />
        </ModalOuterContainer>
    );
};

export default AddBannerNotificationModel;
