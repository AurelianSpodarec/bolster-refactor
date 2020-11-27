import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import BannerNotification from '../presentational/BannerNotification';
import fetchBannerNotification from 'actions/shared/banners/async/fetchBannerNotification';
import postBannerNotificationClose from 'actions/shared/banners/async/postBannerNotificationClose';
import { usePrevious } from 'helpers/hooks';

const BannerNotificationContainer = ({
    fetchBannerNotification,
    isFetching,
    error,
    bannerNotification,
    postBannerNotificationClose,
    isPosting,
    postSuccess,
}) => {
    const [visible, setVisible] = useState(false);
    const prevProps = usePrevious({ isPosting, postSuccess });

    const getBannerNotification = useCallback(async () => {
        await fetchBannerNotification();
        setVisible(true);
    }, []);

    useEffect(() => {
        getBannerNotification();
    }, []);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            setVisible(false);
        }
    }, [postSuccess, isPosting, prevProps.postSuccess, prevProps.isPosting]);

    if (bannerNotification && visible) {
        return (
            <BannerNotification
                content={bannerNotification.content}
                handleBannerClose={handleBannerClose}
            />
        );
    } else {
        return null;
    }

    function handleBannerClose() {
        const postBody = { bannerID: bannerNotification.id };
        postBannerNotificationClose(postBody);
    }
};

const mapStateToProps = ({
    shared: {
        bannerNotificationReducer: {
            isFetching,
            error,
            bannerNotifications,
            isPosting,
            postSuccess,
        },
    },
}) => ({
    isFetching,
    error,
    bannerNotification: bannerNotifications,
    isPosting,
    postSuccess,
});

const mapDispatchToProps = { fetchBannerNotification, postBannerNotificationClose };

export default connect(mapStateToProps, mapDispatchToProps)(BannerNotificationContainer);
