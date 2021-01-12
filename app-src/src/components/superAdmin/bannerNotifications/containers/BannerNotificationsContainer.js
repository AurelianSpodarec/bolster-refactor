import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BannerNotifications from '../presentational/BannerNotifications';
import fetchBannerNotifications from 'actions/superAdmin/bannerNotifications/async/fetchAllBannerNotifications';

const BannerNotificationsContainer = ({ fetchBannerNotifications }) => {
    useEffect(() => {
        fetchBannerNotifications();
    }, []);
    return <BannerNotifications />;
};

const mapDispatchToProps = {
    fetchBannerNotifications,
};
export default connect(null, mapDispatchToProps)(BannerNotificationsContainer);
