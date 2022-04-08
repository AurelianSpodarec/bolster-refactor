import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_PRELIM_FAILURE,
    EDIT_PRELIM_REQUEST,
    EDIT_PRELIM_SUCCESS,
} from 'constants/actionTypes/prelims';

export const editPrelimRequest = () => ({
    type: EDIT_PRELIM_REQUEST,
});

export const editPrelimSuccess = payload => ({
    type: EDIT_PRELIM_SUCCESS,
    payload,
});

export const editPrelimFailure = error => ({
    type: EDIT_PRELIM_FAILURE,
    error,
});

export default (id, postBody) => dispatch => {
    dispatch(editPrelimRequest());

    axios
        .post(`${API_URL}/prelims/${id}`, postBody, getHeaders())
        .then(result => dispatch(editPrelimSuccess(result.data)))
        .catch(error => {
            dispatch(editPrelimFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
