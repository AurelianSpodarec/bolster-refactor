import {
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
import {
    selectTimesheetsIsPosting,
    selectTimesheetsPostError,
    timesheetSelectedJobReferenceIDs,
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
    const prevPostError = usePrevious(postError);
    const jobReferenceIDs = useSelector(timesheetSelectedJobReferenceIDs) || [];

    const handleSubmit = () => {
        const postBody = {
            ...formData,
            // shiftStatus: 0,
            jobReferenceIDs,
            startDate: moment(formData.startDate).toISOString(),
            endDate: moment(formData.endDate).toISOString(),
        };

        dispatch(postGenerateTimesheetsCSVRequest());
        const headers = getHeaders();
        axios({
            method: 'post',
            url: `${API_URL}/clockerEntries/report`,
            data: postBody,
            responseType: 'blob',
            ...headers,
        })
            .then(res => {
                const filename = `Timesheets report ${moment(postBody.startDate).format(
                    'YYYY-MM-DD',
                )} - ${moment(postBody.endDate).format('YYYY-MM-DD')}.csv`;

                const fileURL = URL.createObjectURL(res.data);
                const anchor = document.createElement('a');
                anchor.href = fileURL;
                anchor.download = filename;
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
                dispatch(postGenerateTimesheetsCSVSuccess(res.data));
                const message = 'Report generated & downloaded successfully';
                dispatch(hideModal());
                dispatch(showModal(SUCCESS_MODAL, { message }));
            })
            .catch(err => {
                console.log({ err });
                dispatch(postGenerateTimesheetsCSVFailure(err.message));
            });
    };

    useEffect(() => {
        if (postError && !prevPostError) {
            dispatch(showModal(ERROR_MODAL, { message: postError }));
        }
    }, [postError, prevPostError]);

    return { formData, handleChange, handleSubmit, isPosting, postError };
};

export default useGenerateTimesheetReport;
