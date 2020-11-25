import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BannerNotificationsContainer from '../containers/BannerNotificationsContainer';

const BannerNotifications = () => {
    return (
        <>
            <PageHeading withBackButton title="Banner Notifications" />
            <BannerNotificationsContainer />
        </>
    );
};

export default BannerNotifications;
