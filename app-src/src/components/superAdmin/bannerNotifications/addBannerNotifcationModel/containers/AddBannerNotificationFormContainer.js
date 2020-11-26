import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { useForm } from 'helpers/hooks';
import { usePrevious } from 'helpers/hooks';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import BannerNotificationForm from '../../presentational/BannerNotificationForm';
import addBannerNotification from 'actions/superAdmin/bannerNotifications/async/addBannerNotification';

const AddBannerNotificationFormContainer = ({
    addBannerNotification,
    isPosting,
    postSuccess,
    error,
    hideModal,
}) => {
    const [formData, handleChange] = useForm({
        name: '',
        startDate: '',
        endDate: '',
        content: '',
        colour: '',
    });

    const prevProps = usePrevious({ isPosting });

    useEffect(() => {
        if (prevProps.isPosting && !isPosting && postSuccess) {
            hideModal();
        }
        if (prevProps.isPosting && !isPosting && error) {
            showModal(ERROR_MODAL, { message: error });
        }
    }, [isPosting, postSuccess, prevProps.isPosting, error]);

    return (
        <BannerNotificationForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );

    function handleSubmit(e) {
        e.preventDefault();
        addBannerNotification({
            ...formData,
            startDate: moment.utc(formData.startDate).format(),
            endDate: moment.utc(formData.endDate).format(),
        });
    }
};
const mapStateToProps = ({
    superAdmin: {
        bannerNotificationsReducer: { postSuccess, isPosting, error },
    },
}) => ({
    postSuccess,
    isPosting,
    error,
});
const mapDispatchToProps = { addBannerNotification, hideModal };

export default connect(mapStateToProps, mapDispatchToProps)(AddBannerNotificationFormContainer);
