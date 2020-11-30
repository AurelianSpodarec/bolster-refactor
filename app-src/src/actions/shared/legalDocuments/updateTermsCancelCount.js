import axios from 'axios';

import {
    UPDATE_TERMS_CANCEL_COUNT_REQUEST,
    UPDATE_TERMS_CANCEL_COUNT_SUCCESS,
    UPDATE_TERMS_CANCEL_COUNT_FAILURE,
} from 'constants/actionTypes/legalDocuments';
import { getHeaders } from 'helpers/api';
import { FRONTEND_API_URL } from 'config';

const updateTermsCancelCountRequest = () => ({
    type: UPDATE_TERMS_CANCEL_COUNT_REQUEST,
});

const updateTermsCancelCountSuccess = payload => ({
    type: UPDATE_TERMS_CANCEL_COUNT_SUCCESS,
    payload,
});

const updateTermsCancelCountFailure = error => ({
    type: UPDATE_TERMS_CANCEL_COUNT_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(updateTermsCancelCountRequest());

    return axios
        .post(`${FRONTEND_API_URL}/legal-documents/cancel`, getHeaders())
        .then(res => dispatch(updateTermsCancelCountSuccess(res.data)))
        .catch(err => dispatch(updateTermsCancelCountFailure(err.message)));
};
