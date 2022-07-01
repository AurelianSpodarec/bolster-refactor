import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    POST_GENERATE_TIMESHEETS_CSV_REQUEST,
    POST_GENERATE_TIMESHEETS_CSV_FAILURE,
    POST_GENERATE_TIMESHEETS_CSV_SUCCESS,
} from 'constants/actionTypes/timesheets';
import moment from 'moment';

export const postGenerateTimesheetsCSVRequest = () => ({
    type: POST_GENERATE_TIMESHEETS_CSV_REQUEST,
});

export const postGenerateTimesheetsCSVSuccess = payload => ({
    type: POST_GENERATE_TIMESHEETS_CSV_SUCCESS,
    payload,
});

export const postGenerateTimesheetsCSVFailure = error => ({
    type: POST_GENERATE_TIMESHEETS_CSV_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postGenerateTimesheetsCSVRequest());
    axios
        .post(`${API_URL}/clockerEntries/report`, postBody, getHeaders())
        .then(res => {
            dispatch(postGenerateTimesheetsCSVSuccess(res.data));
            const filename = `Timesheets report ${moment(postBody.startDate).format(
                'YYYY-MM-DD',
            )} - ${moment(postBody.endDate).format('YYYY-MM-DD')}.csv`;
            res.blob().then(blob => {
                const fileURL = URL.createObjectURL(blob);

                const anchor = document.createElement('a');
                anchor.href = fileURL;
                anchor.download = filename;

                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
            });
        })
        .catch(err => dispatch(postGenerateTimesheetsCSVFailure(err.message)));
};
