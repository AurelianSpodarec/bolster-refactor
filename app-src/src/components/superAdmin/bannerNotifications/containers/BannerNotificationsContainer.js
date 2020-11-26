import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import BannerNotifications from '../presentational/BannerNotifications';

const BannerNotificationsContainer = ({ fetchBannerNotifications }) => {
    const getBannerNotifications = useCallback(async () => {
        await fetchBannerNotifications();
    }, []);

    // useEffect(() => {
    //     getBannerNotifications();
    // }, []);
    return <BannerNotifications />;
};

const mapDispatchToProps = {
    /*fetchBannerNotifications*/
};
export default connect(null, mapDispatchToProps)(BannerNotificationsContainer);
