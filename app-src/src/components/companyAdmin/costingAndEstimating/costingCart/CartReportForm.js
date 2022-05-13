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
import { capitaliseWord } from '../../../../helpers/generic';
import Field from 'components/shared/generic/form/presentational/Field';

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

    const [reportFormData, handleChange] = useForm({
        projectName: '',
        projectDescription: '',
        clientName: '',
    });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(hideModal());
            history.push('/company/reports');
            dispatch(
                showModal(GENERATE_COSTING_ESTIMATING_REPORT_SUCCESS_MODAL, {
                    hideModal: dispatch(hideModal),
                }),
            );
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
        projectName: reportFormData.projectName,
        projectDescription: reportFormData.projectDescription,
        clientName: reportFormData.clientName,
    };

    const handleSubmit = () => {
        dispatch(createCostingAndEstimatingReport(cAndEPostBody));
        dispatch(showModal(GENERATE_COSTING_ESTIMATING_REPORT_MODAL));
    };

    return (
        <div className="cart-report-form">
            <Field name="Client name" required>
                <TextInputContainer
                    name="clientName"
                    handleChange={handleChange}
                    value={reportFormData.clientName}
                    required
                    placeholder="Insert text here..."
                />
            </Field>
            <Field name="Project name" required>
                <TextInputContainer
                    name="projectName"
                    handleChange={handleChange}
                    value={reportFormData.projectName}
                    required
                    placeholder="Insert text here..."
                />
            </Field>
            <Field name="Project description" required>
                <TextAreaContainer
                    name="projectDescription"
                    handleChange={handleChange}
                    value={reportFormData.projectDescription}
                    required
                    placeholder="Insert text here..."
                    disableResize
                />
            </Field>
            <Field classes="no-margin">
                <ActionButton
                    text={`Generate ${
                        selectedTabType === costingAndEstimatingType.COSTING ? 'Cost' : 'Estimate'
                    } Sheet`}
                    extraClasses="center justify-stretch"
                    onClick={handleSubmit}
                    size="medium"
                    disabled={
                        !reportFormData.projectName ||
                        !reportFormData.projectDescription ||
                        !reportFormData.clientName
                    }
                />
            </Field>
        </div>
    );
};

export default CartReportForm;
