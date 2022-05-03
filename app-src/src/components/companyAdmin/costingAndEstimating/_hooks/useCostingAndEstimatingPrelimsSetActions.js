import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePrevious } from 'helpers/hooks';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectCostingAndEstimatingPostError,
    selectCostingAndEstimatingPostSuccess,
} from 'selectors/companyAdmin/costingAndEstimating';
import {
    ADD_LINK_PRELIM_MODAL,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_MODAL,
    ERROR_MODAL,
    EDIT_LINK_PRELIM_MODAL,
    DELETE_LINK_PRELIM_MODAL,
    DELETE_COSTING_AND_ESTIMATING_PRELIM_MODAL,
} from 'constants/shared/modalTypes';

const useCostingAndEstimatingPrelimsSetActions = () => {
    const dispatch = useDispatch();
    const postError = useSelector(selectCostingAndEstimatingPostError);
    const postSuccess = useSelector(selectCostingAndEstimatingPostSuccess);
    const prevProps = usePrevious({ postError, postSuccess });

    const showExistingPrelimModal = () => {
        dispatch(showModal(ADD_LINK_PRELIM_MODAL));
    };

    const showAddCustomPrelimModal = () => {
        dispatch(showModal(CREATE_COSTING_AND_ESTIMATING_PRELIM_MODAL));
    };

    const showEditCustomPrelimModal = prelim => {
        dispatch(showModal(EDIT_LINK_PRELIM_MODAL, { prelim }));
    };

    const showDeleteCustomPrelimModal = () => {
        dispatch(showModal(DELETE_LINK_PRELIM_MODAL));
    };

    const showDeleteExistingPrelimModal = () => {
        dispatch(showModal(DELETE_COSTING_AND_ESTIMATING_PRELIM_MODAL));
    };

    useEffect(() => {
        if (postError && !prevProps.postError) dispatch(showModal(ERROR_MODAL));
    }, [postError, prevProps.postError]);

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) dispatch(hideModal());
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
