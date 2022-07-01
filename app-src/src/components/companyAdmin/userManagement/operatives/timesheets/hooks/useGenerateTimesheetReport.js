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
    timesheetSelectedCompanyIDs,
    timesheetSelectedJobReferenceIDs,
} from 'selectors/companyAdmin/timesheets';
import { API_URL } from 'config';
import { DATE_TIME_POST_START, DATE_TIME_POST_END } from 'constants/shared/dateFormats';
import useIsAdminPlus from '../../../../../../hooks/useIsAdminPlus';
import { SHIFT_STATUS, SHIFT_STATUS_REVERSE } from 'constants/companyAdmin/enums';

const useGenerateTimesheetReport = (fromDateInclusive, toDateInclusive) => {
    const isAdminPlus = useIsAdminPlus();
    const dispatch = useDispatch();
    const [formData, handleChange] = useForm({
        includeJobReferences: true,
        includeBreaks: true,
        includeWages: isAdminPlus,
        includeExpenses: isAdminPlus,
        startDate: fromDateInclusive,
        endDate: toDateInclusive,
        shiftStatus: null,
    });

    const isPosting = useSelector(selectTimesheetsIsPosting);
    const postError = useSelector(selectTimesheetsPostError);
    const prevPostError = usePrevious(postError);
    const jobReferenceIDs = useSelector(timesheetSelectedJobReferenceIDs) || [];
    const companyUserIDs = useSelector(timesheetSelectedCompanyIDs) || [];

    const shiftStatusOptions = [
        { value: null, label: 'All' },
        ...Object.entries(SHIFT_STATUS_REVERSE).map(([key, name]) => ({
            value: +key,
            label: name,
        })),
    ];

    const handleSubmit = () => {
        const startDate = moment(formData.startDate).format(DATE_TIME_POST_START);
        const endDate = moment(formData.endDate).format(DATE_TIME_POST_END);

        const postBody = {
            ...formData,
            jobReferenceIDs,
            companyUserIDs,
            startDate: startDate,
            endDate: endDate,
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
                const filename = `Timesheets report ${moment(startDate).format(
                    'DD-MM-YYYY',
                )} - ${moment(endDate).format('DD-MM-YYYY')}.csv`;

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

    return { formData, handleChange, handleSubmit, isPosting, postError, shiftStatusOptions };
};

export default useGenerateTimesheetReport;
