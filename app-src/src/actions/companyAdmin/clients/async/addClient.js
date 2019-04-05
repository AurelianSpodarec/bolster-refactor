import Axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    ADD_CLIENT_REQUEST,
    ADD_CLIENT_SUCCESS,
    ADD_CLIENT_FAILURE
} from 'constants/actionTypes/clients';

export const addClientRequest = () => ({
    type: ADD_CLIENT_REQUEST
});

export const addClientSuccess = payload => ({
    type: ADD_CLIENT_SUCCESS,
    payload
});

export const addClientFailure = error => ({
    type: ADD_CLIENT_FAILURE,
    error
});

export default (HierarchyType, HierarchyID, postBody) => dispatch => {
    dispatch(addClientRequest());
    return Axios.post(
        `${API_URL}/clientpermissions/${HierarchyType}/${HierarchyID}`,
        postBody,
        getHeaders()
    )
        .then(({ data }) => dispatch(addClientSuccess(data)))
        .catch(err => {
            dispatch(addClientFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
