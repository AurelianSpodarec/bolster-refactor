import showModal from 'actions/shared/generic/modals/sync/showModal';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ERROR_MODAL,
    GENERATE_COSTING_ESTIMATING_REPORT_MODAL,
    GENERATE_COSTING_ESTIMATING_REPORT_SUCCESS_MODAL,
} from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import {
    selectCostingAndEstimatingPostError,
    selectCostingAndEstimatingPostSuccess,
} from 'selectors/companyAdmin/costingAndEstimating';
import createCostingAndEstimatingReport from 'actions/companyAdmin/costingAndEstimating/createCostingAndEstimatingReport';
import useCurrentHierarchyID from '../_hooks/useCurrentHierarchyID';
import useCurrentHierarchyType from '../_hooks/useCurrentHierarchyType';
import moment from 'moment';
import { selectHierarchySelectedTab } from 'selectors/shared/tabs';
import { costingAndEstimatingType } from 'constants/companyAdmin/enums';
import { useForm, usePrevious } from 'helpers/hooks';
import { useHistory } from 'react-router-dom';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';

const CartReportForm = ({ formData }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const hierarchyID = useCurrentHierarchyID();
    const hierarchyType = useCurrentHierarchyType();

    const postSuccess = useSelector(selectCostingAndEstimatingPostSuccess);
    const error = useSelector(selectCostingAndEstimatingPostError);
    const prevProps = usePrevious({ postSuccess, error });

    const selectedTab = useSelector(selectHierarchySelectedTab);
    const selectedTabType = costingAndEstimatingType[selectedTab.toUpperCase()];

    const [reportFormData, handleChange] = useForm({ projectName: '', projectDescription: '' });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(hideModal());
            history.push('/company/reports');
            dispatch(showModal(GENERATE_COSTING_ESTIMATING_REPORT_SUCCESS_MODAL), {
                hideModal: dispatch(hideModal),
            });
        }
        if (error && !prevProps.error) {
            dispatch(hideModal());
            dispatch(showModal(ERROR_MODAL, { message: error }));
        }
    }, [postSuccess, prevProps.postSuccess, prevProps.error, error]);

    const cAndEPostBody = {
        hierarchyID,
        hierarchyType,
        fromDate: moment(formData.dateRange.startDate).format('YYYY-MM-DD'),
        toDate: moment(formData.dateRange.endDate).format('YYYY-MM-DD'),
        costEstType: selectedTabType,
    };

    const handleSubmit = () => {
        dispatch(createCostingAndEstimatingReport(cAndEPostBody));
        dispatch(showModal(GENERATE_COSTING_ESTIMATING_REPORT_MODAL));
    };

    return (
        <div className="cart-report-form">
            <TextInputContainer
                name="projectName"
                handleChange={handleChange}
                value={reportFormData.projectName}
                required
                placeholder="Project name"
                classes="field"
            />
            <TextAreaContainer
                name="projectDescription"
                handleChange={handleChange}
                value={reportFormData.projectDescription}
                required
                placeholder="Project description"
                classes="field"
                disableResize
            />
            <ActionButton
                text="Generate Costing Report"
                extraClasses="center justify-stretch"
                onClick={handleSubmit}
                size="medium"
            />
        </div>
    );
};

export default CartReportForm;
