import axios from 'axios';

import {
    DELETE_DEMO_REQUEST_REQUEST,
    DELETE_DEMO_REQUEST_SUCCESS,
    DELETE_DEMO_REQUEST_FAILURE
} from 'constants/actionTypes/demoRequests';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteDemoRequestRequest = () => ({
    type: DELETE_DEMO_REQUEST_REQUEST
});

export const deleteDemoRequestSuccess = id => ({
    type: DELETE_DEMO_REQUEST_SUCCESS,
    id
});

export const deleteDemoRequestFailure = error => ({
    type: DELETE_DEMO_REQUEST_FAILURE,
    error
});

export default demoRequestID => dispatch => {
    dispatch(deleteDemoRequestRequest());
    return axios
        .delete(
            `${ADMIN_API_URL}/enquiries/demo/${demoRequestID}`,
            getHeaders()
        )
        .then(() => dispatch(deleteDemoRequestSuccess(demoRequestID)))
        .catch(err => dispatch(deleteDemoRequestFailure(err.message)));
};
