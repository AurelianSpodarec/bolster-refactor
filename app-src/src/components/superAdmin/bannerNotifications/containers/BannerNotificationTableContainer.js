import React from 'react';
import { connect } from 'react-redux';

import BannerNotificationTable from '../presentational/BannerNotificationTable';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_DELETE, ERROR_MODAL, EDIT_BANNER_NOTIFICATION } from 'constants/shared/modalTypes';

const BannerNotificationTableContainer = ({
    isFetching,
    error,
    bannerNotifications,
    showModal,
}) => {
    return (
        <BannerNotificationTable
            showModal={showNewBannerModal}
            error={error}
            bannerNotifications={bannerNotifications}
            isFetching={isFetching}
            headers={['Name', 'Content', 'Start Date', 'End Date', 'Colour']}
            showDeleteModal={showDeleteModal}
            showEditModal={showEditModal}
        />
    );

    function showNewBannerModal() {
        console.log('inside modal');
        // show the Form container inside a modal
    }

    function showDeleteModal(id) {
        showModal(CONFIRM_DELETE, { handleDelete: () => handleDelete(id) });
    }

    function showEditModal(bannerNotification) {
        showModal(EDIT_BANNER_NOTIFICATION, { bannerNotification });
    }
    async function handleDelete(id) {
        // const { success } = await deleteBannerNotification(id);
        // if (success) {
        //     hideModal();
        // } else {
        // showModal(ERROR_MODAL);
        // }
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

const mapDispatchToProps = { showModal };
export default connect(mapStateToProps, mapDispatchToProps)(BannerNotificationTableContainer);
