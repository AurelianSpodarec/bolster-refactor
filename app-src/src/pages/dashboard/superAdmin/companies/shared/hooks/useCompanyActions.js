import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import {
    ADMIN_DISABLE_COMPANY,
    ADMIN_ENABLE_COMPANY,
    ERROR_MODAL,
} from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompaniesError, selectCompaniesPostSuccess } from 'selectors/superAdmin/companies';

const useCompanyActions = company => {
    const dispatch = useDispatch();

    const postError = useSelector(selectCompaniesError);
    const postSuccess = useSelector(selectCompaniesPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const showEnableCompanyModal = () => {
        dispatch(showModal(ADMIN_ENABLE_COMPANY, { company }));
    };

    const showDisableCompanyModal = () => {
        dispatch(showModal(ADMIN_DISABLE_COMPANY, { company }));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) {
            dispatch(showModal(ERROR_MODAL));
        }
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(hideModal());
        }
    }, [postSuccess, prevProps.postSuccess]);

    return {
        showEnableCompanyModal,
        showDisableCompanyModal,
    };
};

export default useCompanyActions;
