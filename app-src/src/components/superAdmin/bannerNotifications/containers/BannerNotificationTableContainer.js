import React from 'react';
import { connect } from 'react-redux';

import BannerNotificationTable from '../presentational/BannerNotificationTable';

const BannerNotificationTableContainer = ({ isFetching, error, bannerNotifications }) => {
    console.log({ bannerNotifications });
    return (
        <BannerNotificationTable
            showModal={showNewBannerModal}
            error={error}
            bannerNotifications={bannerNotifications}
            isFetching={isFetching}
            headers={['Name', 'Content', 'Start Date', 'End Date', 'Colour']}
        />
    );

    function showNewBannerModal() {
        console.log('inside modal');
        // show the Form container inside a modal
    }
};

const mapStateToProps = ({
    superAdmin: {
        bannerNotificationsReducer: { isFetching, error, bannerNotifications },
    },
}) => ({
    isFetching,
    error,
    bannerNotifications: Object.values(bannerNotifications),
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(BannerNotificationTableContainer);
