import showModal from 'actions/shared/generic/modals/sync/showModal';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GENERATE_COSTING_ESTIMATING_REPORT_MODAL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectCostingAndEstimatingIsPosting,
    selectCostingAndEstimatingPostError,
    selectCostingAndEstimatingPostSuccess,
} from 'selectors/companyAdmin/costingAndEstimating';

const CartReportButton = () => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectCostingAndEstimatingIsPosting);
    const postSuccess = useSelector(selectCostingAndEstimatingPostSuccess);
    const error = useSelector(selectCostingAndEstimatingPostError);

    const handleClick = () => {
        dispatch(
            showModal(GENERATE_COSTING_ESTIMATING_REPORT_MODAL, {
                error,
                hideModal: dispatch(hideModal()),
                isPosting,
                postSuccess,
            }),
        );
    };
    return (
        <ActionButton
            text="Generate Report"
            extraClasses="center cart-report-button"
            onClick={handleClick}
        />
    );
};

export default CartReportButton;
