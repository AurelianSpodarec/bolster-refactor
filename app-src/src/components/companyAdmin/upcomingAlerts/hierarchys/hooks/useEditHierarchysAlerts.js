import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { alertsPostError, alertsPostSuccess, selectAlerts } from 'selectors/companyAdmin/alerts';
import { useForm, usePrevious } from 'helpers/hooks';
import { ALERT_FREQUENCY_TYPES } from 'constants/companyAdmin/enums';
import { updateAlert } from 'actions/companyAdmin/alerts/sync/updateAlert';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';

const useEditHierarchyAlert = id => {
    const dispatch = useDispatch();
    const postSuccess = useSelector(alertsPostSuccess);
    const postError = useSelector(alertsPostError);
    const prevProps = usePrevious({ postSuccess, postError });
    const alerts = useSelector(selectAlerts);

    const alert = Object.values(alerts).find(alert => alert.id === id);

    const [form, handleChange] = useForm({
        name: alert?.name,
        description: alert?.description,
        method: alert?.method,
        date: new Date(alert.date),
        frequencyType: alert?.frequencyType,
        frequencyAmount: alert?.frequencyAmount ?? '1',
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
            date: moment(form.date).format(),
            frequencyAmount:
                form.frequencyType === ALERT_FREQUENCY_TYPES.ONCE
                    ? 1
                    : parseInt(form.frequencyAmount),
        };

        dispatch(updateAlert(id, postBody));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess)
            dispatch(showModal(SUCCESS_MODAL, { message: 'Alert updated successfully!' }));
    }, [postSuccess, prevProps.postSuccess]);

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return {
        form,
        handleChange,
        handleSubmit,
    };
};

export default useEditHierarchyAlert;
