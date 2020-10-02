import axios from 'axios';

import {
    ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_REQUEST,
    ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_SUCCESS,
    ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_FAILURE,
} from 'constants/actionTypes/companies';
import { ADMIN_API_URL } from 'config';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

export const adminEditDrawingExpiryDateRequest = () => ({
    type: ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_REQUEST,
});

export const adminEditDrawingExpiryDateSuccess = payload => ({
    type: ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_SUCCESS,
    payload,
});

export const adminEditDrawingExpiryDateFailure = error => ({
    type: ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_FAILURE,
    error,
});

export default (postBody, drawingID) => dispatch => {
    dispatch(adminEditDrawingExpiryDateRequest());
    return axios
        .post(`${ADMIN_API_URL}/drawings/${drawingID}/extend`, postBody, getHeaders())
        .then(result => dispatch(adminEditDrawingExpiryDateSuccess(result.data)))
        .catch(error => {
            dispatch(adminEditDrawingExpiryDateFailure(error));
            if (error.response && error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
