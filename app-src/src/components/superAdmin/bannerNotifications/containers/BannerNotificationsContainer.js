import React, { useCallback } from 'react';

import BannerNotifications from '../presentational/BannerNotifications';

const BannerNotificationsContainer = ({ fetchBannerNotifications }) => {
    const getBannerNotifications = useCallback(async () => {
        await fetchBannerNotifications();
    }, []);
    return <BannerNotifications />;
};

export default BannerNotificationsContainer;
