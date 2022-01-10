import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { ALERT_FREQUENCY_TYPES, ALERT_METHOD_TYPES } from 'constants/companyAdmin/enums';
import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import { alertsPostSuccess, alertsPostError } from 'selectors/alerts';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import { createAlert } from 'actions/companyAdmin/alerts/async/createAlert';

const useCreateHierarchyAlert = (hierarchyType, hierarchyID) => {
    const dispatch = useDispatch();
    const postSuccess = useSelector(alertsPostSuccess);
    const postError = useSelector(alertsPostError);
    const prevProps = usePrevious({ postSuccess, postError });

    const [form, handleChange] = useForm({
        name: '',
        description: '',
        method: ALERT_METHOD_TYPES.ALL,
        date: new Date(),
        frequencyType: ALERT_FREQUENCY_TYPES.ONCE,
        frequencyAmount: '1',
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

        dispatch(createAlert(hierarchyType, hierarchyID, postBody));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess)
            dispatch(showModal(SUCCESS_MODAL, { message: 'Alert created successfully!' }));
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

export default useCreateHierarchyAlert;
