import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CREATE_ADMIN_PUSH_NOTIFICATION_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectAdminPushNotificationsPostError,
    selectAdminPushNotificationsPostSuccess,
} from 'selectors/superAdmin/pushNotifications';

const usePushNotificationActions = () => {
    const dispatch = useDispatch();

    const postError = useSelector(selectAdminPushNotificationsPostError);
    const postSuccess = useSelector(selectAdminPushNotificationsPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const handleAddNotification = () => {
        dispatch(showModal(CREATE_ADMIN_PUSH_NOTIFICATION_MODAL));
    };

    const handleEditNotification = () => {
        console.log('handle edit');
    };

    const handleDeleteNotification = () => {
        console.log('handle delete');
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return { handleAddNotification, handleEditNotification, handleDeleteNotification };
};

export default usePushNotificationActions;
