import React from 'react';

import BannerNotificationTable from '../presentational/BannerNotificationTable';

const BannerNotificationTableContainer = () => {
    return <BannerNotificationTable showModal={showNewBannerModal} />;

    function showNewBannerModal() {
        console.log('inside modal');
        // show the Form container inside a modal
    }
};

export default BannerNotificationTableContainer;
