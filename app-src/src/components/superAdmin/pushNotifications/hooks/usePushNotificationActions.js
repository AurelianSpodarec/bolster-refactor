import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CONFIRM_DELETE,
    CREATE_ADMIN_PUSH_NOTIFICATION_MODAL,
    EDIT_ADMIN_PUSH_NOTIFICATION_MODAL,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import deletePushNotification from 'actions/superAdmin/pushNotifications/async/deletePushNotification';
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

    const handleEditNotification = notification => {
        dispatch(showModal(EDIT_ADMIN_PUSH_NOTIFICATION_MODAL, { notification }));
    };

    const handleDeleteNotification = notification => {
        dispatch(
            showModal(CONFIRM_DELETE, {
                title: `Delete ${notification.title}?`,
                message: 'Are you sure you would like to delete this push notification?',
                handleDelete: () => dispatch(deletePushNotification(notification.id)),
            }),
        );
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
