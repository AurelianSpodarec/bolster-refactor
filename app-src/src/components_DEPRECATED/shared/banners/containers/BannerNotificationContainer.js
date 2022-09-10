import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import BannerNotification from '../presentational/BannerNotification';
import fetchBannerNotification from 'actions/shared/banners/async/fetchBannerNotification';
import postBannerNotificationClose from 'actions/shared/banners/async/postBannerNotificationClose';
import { usePrevious } from 'helpers/hooks';
import { isEmpty } from 'helpers/generic';

const BannerNotificationContainer = ({
    fetchBannerNotification,
    bannerNotification,
    postBannerNotificationClose,
    isPosting,
    postSuccess,
    companyID,
}) => {
    const [visible, setVisible] = useState(false);
    const prevProps = usePrevious({ isPosting, postSuccess });

    const getBannerNotification = useCallback(async () => {
        if (companyID) {
            await fetchBannerNotification();
            setVisible(true);
        }
    }, [companyID]);

    useEffect(() => {
        getBannerNotification();
    }, [companyID]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            setVisible(false);
        }
    }, [postSuccess, isPosting, prevProps.postSuccess, prevProps.isPosting]);

    if (!isEmpty(bannerNotification) && visible) {
        return (
            <BannerNotification
                content={bannerNotification.content}
                colour={bannerNotification?.colour?.value ?? 'red'}
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
        decodeJWTReducer: {
            jwtData: { companyID },
        },
    },
}) => ({
    isFetching,
    error,
    bannerNotification: bannerNotifications,
    isPosting,
    postSuccess,
    companyID,
});

const mapDispatchToProps = { fetchBannerNotification, postBannerNotificationClose };

export default connect(mapStateToProps, mapDispatchToProps)(BannerNotificationContainer);
