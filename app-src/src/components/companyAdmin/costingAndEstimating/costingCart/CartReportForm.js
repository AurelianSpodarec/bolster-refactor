import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, usePrevious } from 'helpers/hooks';
import { useHistory } from 'react-router-dom';

import {
    selectCostingAndEstimatingPostError,
    selectCostingAndEstimatingPostSuccess,
} from 'selectors/companyAdmin/costingAndEstimating';
import { selectHierarchySelectedTab } from 'selectors/shared/tabs';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import createCostingAndEstimatingReport from 'actions/companyAdmin/costingAndEstimating/createCostingAndEstimatingReport';
import createCostingAndEstimatingCSVReport from '../../../../actions/companyAdmin/costingAndEstimating/createCostingAndEstimatingCSVReport';

import { costingAndEstimatingType } from 'constants/companyAdmin/enums';
import { ERROR_MODAL, LOADING_DATA, SUCCESS_MODAL } from 'constants/shared/modalTypes';

import Field from 'components/shared/generic/form/presentational/Field';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { selectCompanyTimeZone } from '../../../../selectors/companyAdmin/companySettings';
import moment from 'moment';

const CartReportForm = ({ cAndEPostBody, formData }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const postSuccess = useSelector(selectCostingAndEstimatingPostSuccess);
    const error = useSelector(selectCostingAndEstimatingPostError);
    const prevProps = usePrevious({ postSuccess, error });
    const tz = useSelector(selectCompanyTimeZone);

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
            dispatch(showModal(SUCCESS_MODAL, { message: 'Your report is now being generated.' }));
        }
        if (error && !prevProps.error) {
            dispatch(hideModal());
            dispatch(showModal(ERROR_MODAL, { message: error }));
        }
    }, [postSuccess, prevProps.postSuccess, prevProps.error, error]);

    const postBody = {
        ...cAndEPostBody,
        projectName: reportFormData.projectName,
        projectDescription: reportFormData.projectDescription,
        clientName: reportFormData.clientName,
        generateCSV: reportFormData.generateCSV,
    };

    const handleSubmit = () => {
        dispatch(createCostingAndEstimatingReport(postBody));
        dispatch(showModal(LOADING_DATA, { message: 'Generating Report. Please wait...' }));
    };

    const generateCSV = () => {
        const { histories: historyIDs } = formData.selectedItems;
        const { hierarchyID, hierarchyType, fromDate, toDate, costEstType } = cAndEPostBody;

        const fromDateInclusive = moment(fromDate)?.tz(tz).startOf('day').utc().toISOString();
        const toDateInclusive = moment(toDate)?.tz(tz).endOf('day').utc().toISOString();
        const postBody = {
            hierarchyID: [hierarchyID],
            hierarchyType,
            fromDateInclusive,
            toDateInclusive,
            costEstType,
            historyIDs,
        };

        dispatch(createCostingAndEstimatingCSVReport(postBody));
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
            <Field>
                <ActionButton
                    text="Generate CSV"
                    extraClasses="center justify-stretch"
                    onClick={generateCSV}
                    size="medium"
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
