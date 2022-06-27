import postReport from 'actions/companyAdmin/reports/async/postReport';
import postGenerateTimesheetsCSV, {
    postGenerateTimesheetsCSVFailure,
    postGenerateTimesheetsCSVRequest,
    postGenerateTimesheetsCSVSuccess,
} from 'actions/companyAdmin/timesheets/async/postGenerateTimesheetsCSV';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import axios from 'axios';
import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { getHeaders } from 'helpers/api';
import { useForm, usePrevious } from 'helpers/hooks';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    selectTimesheetsIsPosting,
    selectTimesheetsPostError,
    selectTimesheetsPostSuccess,
} from 'selectors/companyAdmin/timesheets';
import { API_URL } from 'config';

const useGenerateTimesheetReport = (fromDateInclusive, toDateInclusive) => {
    const dispatch = useDispatch();
    const [formData, handleChange] = useForm({
        includeJobReferences: true,
        includeBreaks: true,
        includeWages: true,
        startDate: fromDateInclusive,
        endDate: toDateInclusive,
    });

    const isPosting = useSelector(selectTimesheetsIsPosting);
    const postError = useSelector(selectTimesheetsPostError);
    const postSuccess = useSelector(selectTimesheetsPostSuccess);
    const prevPostSuccess = usePrevious(postSuccess);
    const prevPostError = usePrevious(postError);

    const handleSubmit = () => {
        const postBody = {
            ...formData,
            // shiftStatus: 0,
            startDate: moment(formData.startDate).toISOString(),
            endDate: moment(formData.endDate).toISOString(),
        };

        // dispatch(postGenerateTimesheetsCSV(postBody));
        dispatch(postGenerateTimesheetsCSVRequest());
        axios({
            method: 'post',
            url: `${API_URL}/clockerEntries/report`,
            data: postBody,
            responseType: 'blob',
            headers: getHeaders(),
        })
            .then(res => {
                dispatch(postGenerateTimesheetsCSVSuccess(res.data));
                const filename = `Timesheets report ${moment(postBody.startDate).format(
                    'YYYY-MM-DD',
                )} - ${moment(postBody.endDate).format('YYYY-MM-DD')}.csv`;
                console.log({ res });
                res.data.blob().then(blob => {
                    const fileURL = URL.createObjectURL(blob);

                    const anchor = document.createElement('a');
                    anchor.href = fileURL;
                    anchor.download = filename;

                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                });
            })
            .catch(err => {
                console.log({ err });
                dispatch(postGenerateTimesheetsCSVFailure(err.message));
            });
    };

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            const message = 'Report generated successfully';
            dispatch(hideModal());
            dispatch(showModal(SUCCESS_MODAL, { message }));
        }
        if (postError && !prevPostError) {
            dispatch(showModal(ERROR_MODAL, { message: postError }));
        }
    }, [postError, postSuccess, prevPostError, prevPostSuccess]);

    return { formData, handleChange, handleSubmit, isPosting, postError };
};

export default useGenerateTimesheetReport;
