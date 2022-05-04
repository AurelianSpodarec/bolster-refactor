import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import {
    selectPrelimPostError,
    selectPrelimPostSuccess,
} from '../../../../selectors/companyAdmin/prelims';
import deleteLinkPrelim from '../../../../actions/companyAdmin/costingAndEstimating/deleteLinkPrelim';

import {
    LINK_PRELIM_MODAL,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_MODAL,
    ERROR_MODAL,
    EDIT_LINK_PRELIM_MODAL,
} from 'constants/shared/modalTypes';
import { CONFIRM_DELETE } from 'constants/shared/modalTypes';

const useCostingAndEstimatingPrelimsSetActions = () => {
    const dispatch = useDispatch();
    const postError = useSelector(selectPrelimPostError);
    const postSuccess = useSelector(selectPrelimPostSuccess);

    const prevProps = usePrevious({ postError, postSuccess });

    const showExistingPrelimModal = () => {
        dispatch(showModal(LINK_PRELIM_MODAL));
    };

    const showAddCustomPrelimModal = () => {
        dispatch(showModal(CREATE_COSTING_AND_ESTIMATING_PRELIM_MODAL));
    };

    const showEditCustomPrelimModal = prelim => {
        dispatch(showModal(EDIT_LINK_PRELIM_MODAL, { prelim }));
    };

    const showDeleteCustomPrelimModal = id => {
        dispatch(
            showModal(CONFIRM_DELETE, {
                message: 'Are you sure you want to delete this prelim?',
                handleDelete: () => dispatch(deleteLinkPrelim(id)),
            }),
        );
    };

    const showDeleteExistingPrelimModal = () => {
        dispatch(showModal(CONFIRM_DELETE));
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
        showExistingPrelimModal,
        showAddCustomPrelimModal,
        showEditCustomPrelimModal,
        showDeleteCustomPrelimModal,
        showDeleteExistingPrelimModal,
    };
};

export default useCostingAndEstimatingPrelimsSetActions;
