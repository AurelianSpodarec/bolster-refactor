import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    CREATE_FLOOR_REQUEST,
    CREATE_FLOOR_SUCCESS,
    CREATE_FLOOR_FAILURE
} from 'constants/actionTypes/floors';

export const createFloorRequest = () => ({
    type: CREATE_FLOOR_REQUEST
});

export const createFloorSuccess = payload => ({
    type: CREATE_FLOOR_SUCCESS,
    payload
});

export const createFloorFailure = error => ({
    type: CREATE_FLOOR_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createFloorRequest());

    return axios
        .post(`${API_URL}/floors`, postBody, getHeaders())
        .then(res => dispatch(createFloorSuccess(res.data)))
        .catch(err => {
            dispatch(createFloorFailure(err.message));

            if (err.response.status === 400)
                dispatch(setAPIFieldErrors(err.response.data.errors));
        });
};
