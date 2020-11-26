import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BannerNotification from '../presentational/BannerNotification';
import fetchBannerNotification from 'actions/shared/banners/async/fetchBannerNotification';

const BannerNotificationContainer = ({
    fetchBannerNotification,
    isFetching,
    error,
    bannerNotifications,
}) => {
    useEffect(() => {
        fetchBannerNotification();
    }, []);

    return (
        <BannerNotification
            content={bannerNotifications.content}
            handleBannerClose={handleBannerClose}
        />
    );

    function handleBannerClose() {
        console.log('close the banner');
    }
};

const mapStateToProps = ({
    shared: {
        bannerNotificationReducer: { isFetching, error, bannerNotifications },
    },
}) => ({
    isFetching,
    error,
    bannerNotifications: bannerNotifications,
});

const mapDispatchToProps = { fetchBannerNotification };

export default connect(mapStateToProps, mapDispatchToProps)(BannerNotificationContainer);
