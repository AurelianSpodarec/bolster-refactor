import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    ADD_MANY_CLIENTS_REQUEST,
    ADD_MANY_CLIENTS_SUCCESS,
    ADD_MANY_CLIENTS_FAILURE
} from 'constants/actionTypes/clients';

export const addManyClientsRequest = () => ({
    type: ADD_MANY_CLIENTS_REQUEST
});

export const addManyClientsSuccess = payload => ({
    type: ADD_MANY_CLIENTS_SUCCESS,
    payload
});

export const addManyClientsFailure = error => ({
    type: ADD_MANY_CLIENTS_FAILURE,
    error
});

export default (HierarchyType, HierarchyID, postBody) => dispatch => {
    dispatch(addManyClientsRequest());
    return axios.post(
        `${API_URL}/clientpermissions/${HierarchyType}/${HierarchyID}/many`,
        postBody,
        getHeaders()
    )
        .then(({ data }) => dispatch(addManyClientsSuccess(data)))
        .catch(err => {
            dispatch(addManyClientsFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
