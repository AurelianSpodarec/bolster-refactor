import showModal from 'actions/shared/generic/modals/sync/showModal';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import React from 'react';
import { useDispatch } from 'react-redux';
import { GENERATE_COSTING_ESTIMATING_REPORT_MODAL } from 'constants/shared/modalTypes';

const CartReportButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(showModal(GENERATE_COSTING_ESTIMATING_REPORT_MODAL));
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
