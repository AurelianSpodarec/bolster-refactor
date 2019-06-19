import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_DRAWINGS_REQUEST,
    CREATE_DRAWINGS_SUCCESS,
    CREATE_DRAWINGS_FAILURE
} from 'constants/actionTypes/drawings';

export const createDrawingsRequest = () => ({
    type: CREATE_DRAWINGS_REQUEST
});

export const createDrawingsSuccess = payload => ({
    type: CREATE_DRAWINGS_SUCCESS,
    payload
});

export const createDrawingsFailure = error => ({
    type: CREATE_DRAWINGS_FAILURE,
    error
});

export default drawing => dispatch => {
    dispatch(createDrawingsRequest());
    axios
        .post(`${API_URL}/drawings/multiple`, drawing, getHeaders())
        .then(result => dispatch(createDrawingsSuccess(result.data)))
        .catch(error => {
            dispatch(createDrawingsFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
