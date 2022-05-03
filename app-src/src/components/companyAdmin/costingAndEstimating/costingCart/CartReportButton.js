import showModal from 'actions/shared/generic/modals/sync/showModal';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    GENERATE_COSTING_ESTIMATING_REPORT_MODAL,
    GENERATE_COSTING_ESTIMATING_REPORT_SUCCESS_MODAL,
} from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectCostingAndEstimatingIsPosting,
    selectCostingAndEstimatingPostError,
    selectCostingAndEstimatingPostSuccess,
} from 'selectors/companyAdmin/costingAndEstimating';
import createCostingAndEstimatingReport from 'actions/companyAdmin/costingAndEstimating/createCostingAndEstimatingReport';
import useCurrentHierarchyID from '../_hooks/useCurrentHierarchyID';
import useCurrentHierarchyType from '../_hooks/useCurrentHierarchyType';
import moment from 'moment';
import { selectHierarchySelectedTab } from 'selectors/shared/tabs';
import { costingAndEstimatingType } from 'constants/companyAdmin/enums';
import { usePrevious } from 'helpers/hooks';

const CartReportButton = ({ formData }) => {
    const dispatch = useDispatch();
    const hierarchyID = useCurrentHierarchyID();
    const hierarchyType = useCurrentHierarchyType();

    const isPosting = useSelector(selectCostingAndEstimatingIsPosting);
    const postSuccess = useSelector(selectCostingAndEstimatingPostSuccess);
    const prevSuccess = usePrevious(postSuccess);
    const error = useSelector(selectCostingAndEstimatingPostError);

    const selectedTab = useSelector(selectHierarchySelectedTab);
    const selectedTabType = costingAndEstimatingType[selectedTab.toUpperCase()];

    useEffect(() => {
        if (postSuccess && !prevSuccess) {
            dispatch(hideModal());
            dispatch(showModal(GENERATE_COSTING_ESTIMATING_REPORT_SUCCESS_MODAL), {});
        }
    }, [postSuccess, prevSuccess]);

    const cAndEPostBody = {
        hierarchyID,
        hierarchyType,
        fromDate: moment(formData.dateRange.startDate).format('YYYY-MM-DD'),
        toDate: moment(formData.dateRange.endDate).format('YYYY-MM-DD'),
        costEstType: selectedTabType,
    };

    const handleClick = () => {
        dispatch(createCostingAndEstimatingReport(cAndEPostBody));
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
