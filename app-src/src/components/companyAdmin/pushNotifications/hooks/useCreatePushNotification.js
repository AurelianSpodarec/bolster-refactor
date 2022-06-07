import { useDispatch, useSelector } from 'react-redux';

import {
    PUSH_NOTIFICATION_FREQUENCY_VALUES,
    PUSH_NOTIFICATION_TARGET_VALUES,
} from 'constants/shared/enums';

import createPushNotification from 'actions/companyAdmin/pushNotifications/async/createPushNotification';
import { selectPushNotificationsIsPosting } from 'selectors/companyAdmin/pushNotifications';

import { useForm } from 'helpers/hooks';
import { handleDaysConversion } from 'helpers/generic';

import useConvertDateTimeToCompanyTimeZone from 'hooks/useConvertDateTimeToCompanyTimeZone';

const useCreatePushNotification = () => {
    const dispatch = useDispatch();

    const isPosting = useSelector(selectPushNotificationsIsPosting);

    const [form, handleChange] = useForm({
        title: '',
        message: '',
        target: PUSH_NOTIFICATION_TARGET_VALUES.ALL,
        siteID: null,
        userIDs: [],
        date: '',
        frequency: PUSH_NOTIFICATION_FREQUENCY_VALUES.ONCE,
        recurrenceDays: [],
    });

    const convertedDate = useConvertDateTimeToCompanyTimeZone(form.date);

    const handleSubmit = () => {
        const { recurrenceDays, date, ...rest } = form;

        const postBody = {
            ...rest,
            date: convertedDate,
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
