import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    PUSH_NOTIFICATION_FREQUENCY_VALUES,
    PUSH_NOTIFICATION_TARGET_VALUES,
} from 'constants/shared/enums';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

import createPushNotification from 'actions/superAdmin/pushNotifications/async/createPushNotification';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectAdminPushNotificationsIsPosting,
    selectAdminPushNotificationsPostError,
    selectAdminPushNotificationsPostSuccess,
} from 'selectors/superAdmin/pushNotifications';

import { useForm, usePrevious } from 'helpers/hooks';

const useCreatePushNotification = () => {
    const dispatch = useDispatch();

    const isPosting = useSelector(selectAdminPushNotificationsIsPosting);
    const postError = useSelector(selectAdminPushNotificationsPostError);
    const postSuccess = useSelector(selectAdminPushNotificationsPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const [form, handleChange] = useForm({
        title: '',
        message: '',
        date: '',
        frequency: PUSH_NOTIFICATION_FREQUENCY_VALUES.ONCE,
        recurrenceDays: [],
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
            target: PUSH_NOTIFICATION_TARGET_VALUES.ALL,
        };

        dispatch(createPushNotification(postBody));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
    }, [postSuccess, prevProps.postSuccess]);

    return { form, handleChange, handleSubmit, isPosting };
};

export default useCreatePushNotification;
