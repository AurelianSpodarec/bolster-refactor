import React, { useEffect } from 'react';

import moment from 'moment';
import { useForm } from 'helpers/hooks';
import { connect } from 'react-redux';
import { usePrevious } from 'helpers/hooks';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import { ERROR_MODAL } from 'constants/shared/modalTypes';

import BannerNotificationForm from '../../presentational/BannerNotificationForm';
import editBannerNotification from 'actions/superAdmin/bannerNotifications/async/editBannerNotification';

const EditBannerNotificationFormContainer = ({
    bannerNotification,
    editBannerNotification,
    hideModal,
    showModal,
    isPosting,
    postSuccess,
    error,
}) => {
    const [formData, handleChange] = useForm({
        name: bannerNotification.name,
        startDate: new Date(moment.utc(bannerNotification.startDate)),
        endDate: new Date(moment.utc(bannerNotification.endDate)),
        content: bannerNotification.content,
        colour: { text: bannerNotification.colour.text, value: bannerNotification.colour.value },
    });

    const prevProps = usePrevious({ isPosting });

    const colourOptions = [
        { text: 'Red', value: '#d71a1a' },
        { text: 'Orange', value: '#e89901' },
        { text: 'Green', value: '#2eac58' },
    ];

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
            colourOptions={colourOptions}
            handleColourChange={handleColourChange}
        />
    );

    function handleColourChange(name, value) {
        colourOptions.forEach(colourOption => {
            if (value === colourOption.value) {
                handleChange(name, { text: colourOption.text, value: value });
            }
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const postBody = {
            ...formData,
            startDate: moment.utc(formData.startDate).format(),
            endDate: moment.utc(formData.endDate).format(),
        };
        console.log(postBody);
        editBannerNotification(postBody, bannerNotification.id);
    }
};

const mapStateToProps = ({
    superAdmin: {
        bannerNotificationsReducer: { postSuccess, isPosting, error },
    },
}) => ({ postSuccess, isPosting, error });

const mapDispatchToProps = { editBannerNotification, showModal, hideModal };

export default connect(mapStateToProps, mapDispatchToProps)(EditBannerNotificationFormContainer);
