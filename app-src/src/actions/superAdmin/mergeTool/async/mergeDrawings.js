import axios from 'axios';

import {
    ADMIN_MERGE_DRAWING_REQUEST,
    ADMIN_MERGE_DRAWING_SUCCESS,
    ADMIN_MERGE_DRAWING_FAILURE
} from 'constants/actionTypes/mergeTool';
import { ADMIN_API_URL } from 'config';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

export const adminMergeDrawingRequest = () => ({
    type: ADMIN_MERGE_DRAWING_REQUEST
});

export const adminMergeDrawingSuccess = (payload) => ({
    type: ADMIN_MERGE_DRAWING_SUCCESS,
    payload,
});

export const adminMergeDrawingFailure = error => ({
    type: ADMIN_MERGE_DRAWING_FAILURE,
    error
});

export default (postBody) => dispatch => {
    dispatch(adminMergeDrawingRequest());

    return axios
        .post(
            `${ADMIN_API_URL}/drawings/merge`,
            postBody,
            getHeaders()
        )
        .then(result =>
            dispatch(adminMergeDrawingSuccess(result.data))
        )
        .catch(error => {
            dispatch(adminMergeDrawingFailure(error));
            if (error.response && error.response.status === 400) 
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
