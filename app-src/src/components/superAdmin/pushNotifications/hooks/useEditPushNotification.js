import { useDispatch, useSelector } from 'react-redux';

import {
    PUSH_NOTIFICATION_FREQUENCY_VALUES,
    PUSH_NOTIFICATION_TARGET_VALUES,
} from 'constants/shared/enums';

import createPushNotification from 'actions/superAdmin/pushNotifications/async/createPushNotification';
import { selectAdminPushNotificationsIsPosting } from 'selectors/superAdmin/pushNotifications';

import { useForm } from 'helpers/hooks';
import { handleDaysConversion } from 'helpers/generic';

const useEditPushNotification = notification => {
    const dispatch = useDispatch();

    const isPosting = useSelector(selectAdminPushNotificationsIsPosting);

    const [form, handleChange] = useForm({
        title: notification.title,
        message: notification.message,
        date: new Date(notification.date),
        frequency: notification.frequency,
        recurrenceDays: notification.recurrenceDays ? notification.recurrenceDays : [],
    });

    const handleSubmit = () => {
        const { recurrenceDays, ...rest } = form;

        const postBody = {
            ...rest,
            target: PUSH_NOTIFICATION_TARGET_VALUES.ALL,
            recurrenceDays:
                +form.frequency === PUSH_NOTIFICATION_FREQUENCY_VALUES.WEEKLY
                    ? handleDaysConversion(recurrenceDays)
                    : null,
        };

        dispatch(createPushNotification(postBody));
    };

    return { form, handleChange, handleSubmit, isPosting };
};

export default useEditPushNotification;
