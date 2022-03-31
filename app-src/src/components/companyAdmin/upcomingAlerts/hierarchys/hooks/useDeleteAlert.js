import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { alertsPostError, alertsPostSuccess } from 'selectors/companyAdmin/alerts';
import { usePrevious } from 'helpers/hooks';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import deleteAlert from 'actions/companyAdmin/alerts/async/deleteAlert';

const useDeleteAlert = id => {
    const dispatch = useDispatch();
    const postSuccess = useSelector(alertsPostSuccess);
    const postError = useSelector(alertsPostError);
    const prevProps = usePrevious({ postSuccess, postError });

    const handleSubmit = () => {
        dispatch(deleteAlert(id));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess)
            dispatch(showModal(SUCCESS_MODAL, { message: 'Alert deleted successfully!' }));
    }, [postSuccess, prevProps.postSuccess]);

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    return {
        handleSubmit,
    };
};

export default useDeleteAlert;
