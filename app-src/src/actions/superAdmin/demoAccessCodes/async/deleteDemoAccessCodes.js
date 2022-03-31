import axios from 'axios';

import {
    DELETE_DEMO_ACCESS_CODES_REQUEST,
    DELETE_DEMO_ACCESS_CODES_SUCCESS,
    DELETE_DEMO_ACCESS_CODES_FAILURE,
} from 'constants/actionTypes/demoAccessCodes';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteDemoAccessCodesRequest = () => ({
    type: DELETE_DEMO_ACCESS_CODES_REQUEST,
});

export const deleteDemoAccessCodesSuccess = (id, payload) => ({
    type: DELETE_DEMO_ACCESS_CODES_SUCCESS,
    id,
    payload,
});

export const deleteDemoAccessCodesFailure = error => ({
    type: DELETE_DEMO_ACCESS_CODES_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deleteDemoAccessCodesRequest());

    return axios
        .delete(`${ADMIN_API_URL}/demo/delete/${id}`, getHeaders())
        .then(res => dispatch(deleteDemoAccessCodesSuccess(id, res.data)))
        .catch(err => dispatch(deleteDemoAccessCodesFailure(err.message)));
};
