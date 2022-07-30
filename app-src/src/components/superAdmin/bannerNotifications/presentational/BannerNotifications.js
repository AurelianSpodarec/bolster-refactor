import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BannerNotificationTableContainer from '../containers/BannerNotificationTableContainer';

const BannerNotifications = () => {
    return (
        <>
            <PageHeading title="Banner Notifications" />

            <BannerNotificationTableContainer />
        </>
    );
};

export default BannerNotifications;
