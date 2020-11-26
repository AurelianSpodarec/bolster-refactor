import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BannerNotificationFormContainer from '../containers/BannerNotificationFormContainer';

const BannerNotifications = () => {
    return (
        <>
            <PageHeading withBackButton title="Banner Notifications" />
            <BlockContainer>
                <BannerNotificationFormContainer />
            </BlockContainer>
        </>
    );
};

export default BannerNotifications;
