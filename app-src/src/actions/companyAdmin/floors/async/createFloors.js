import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    CREATE_FLOORS_REQUEST,
    CREATE_FLOORS_SUCCESS,
    CREATE_FLOORS_FAILURE
} from 'constants/actionTypes/floors';

export const createFloorsRequest = () => ({
    type: CREATE_FLOORS_REQUEST
});

export const createFloorsSuccess = payload => ({
    type: CREATE_FLOORS_SUCCESS,
    payload
});

export const createFloorsFailure = error => ({
    type: CREATE_FLOORS_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createFloorsRequest());

    return axios
        .post(`${API_URL}/floors/multiple`, postBody, getHeaders())
        .then(res => dispatch(createFloorsSuccess(res.data)))
        .catch(err => {
            dispatch(createFloorsFailure(err.message));

            if (err.response.status === 400)
                dispatch(setAPIFieldErrors(err.response.data.errors));
        });
};
