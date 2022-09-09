import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
    PUSH_NOTIFICATION_FREQUENCY_VALUES,
    PUSH_NOTIFICATION_TARGET_VALUES,
} from 'constants/shared/enums';

import createPushNotification from 'actions/superAdmin/pushNotifications/async/createPushNotification';
import { selectAdminPushNotificationsIsPosting } from 'selectors/superAdmin/pushNotifications';

import { useForm } from 'helpers/hooks';
import { handleDaysConversion } from 'helpers/generic';

const useCreatePushNotification = () => {
    const dispatch = useDispatch();

    const isPosting = useSelector(selectAdminPushNotificationsIsPosting);

    const [form, handleChange] = useForm({
        title: '',
        message: '',
        date: '',
        frequency: PUSH_NOTIFICATION_FREQUENCY_VALUES.ONCE,
        recurrenceDays: [],
    });

    const handleSubmit = () => {
        const { recurrenceDays, date, ...rest } = form;

        const postBody = {
            ...rest,
            target: PUSH_NOTIFICATION_TARGET_VALUES.ALL,
            date: moment(date).format(),
            recurrenceDays:
                +form.frequency === PUSH_NOTIFICATION_FREQUENCY_VALUES.WEEKLY
                    ? handleDaysConversion(recurrenceDays)
                    : null,
        };

        dispatch(createPushNotification(postBody));
    };

    return { form, handleChange, handleSubmit, isPosting };
};

export default useCreatePushNotification;
