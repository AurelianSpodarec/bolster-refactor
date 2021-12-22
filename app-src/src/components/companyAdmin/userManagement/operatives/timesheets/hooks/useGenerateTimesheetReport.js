import postReport from 'actions/companyAdmin/reports/async/postReport';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { reportPostSuccess } from 'selectors/companyAdmin/timesheets';

const useGenerateTimesheetReport = (
    fromDateInclusive,
    toDateInclusive,
    serviceID,
    hierarchyID,
    pinIDs,
) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, handleChange] = useForm({
        isPDFGeneration: true,
        isCSVGeneration: false,
        isFloorplanGeneration: false,
        isOAndMManualGeneration: false,
        // selectSortBy: '3',
        // showHidden: false,
    });
    const reportSuccess = useSelector(reportPostSuccess);
    const prevReportPostSuccess = usePrevious(reportSuccess);

    const handleSubmit = () => {
        const postBody = {
            ...formData,
            hierarchyType: 'drawing',
            hierarchyID,
            pinIDs,
            fromDateInclusive,
            toDateInclusive,
            sortBy: 3,
            reportHistories: 1,
            serviceID,
        };

        dispatch(postReport(postBody));
    };

    useEffect(() => {
        if (reportSuccess && !prevReportPostSuccess) {
            dispatch(
                showModal(SUCCESS_MODAL, {
                    message: 'Your report is now being generated',
                }),
            );

            return history.push('/company/reports');
        }
    }, [reportSuccess, prevReportPostSuccess]);

    return { formData, handleChange, handleSubmit };
};

export default useGenerateTimesheetReport;
