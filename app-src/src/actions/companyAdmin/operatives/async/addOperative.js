import Axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    ADD_OPERATIVE_REQUEST,
    ADD_OPERATIVE_SUCCESS,
    ADD_OPERATIVE_FAILURE
} from 'constants/actionTypes/operatives';

export const addOperativeRequest = () => ({
    type: ADD_OPERATIVE_REQUEST
});

export const addOperativeSuccess = payload => ({
    type: ADD_OPERATIVE_SUCCESS,
    payload
});

export const addOperativeFailure = error => ({
    type: ADD_OPERATIVE_FAILURE,
    error
});

export default (HierarchyType, HierarchyID, postBody) => dispatch => {
    dispatch(addOperativeRequest());
    return Axios.post(
        `${API_URL}/operativepermissions/${HierarchyType}/${HierarchyID}`,
        postBody,
        getHeaders()
    )
        .then(({ data }) => dispatch(addOperativeSuccess(data)))
        .catch(({ response, message }) => {
            response.status === 400
                ? dispatch(setAPIFieldErrors(response.data.errors))
                : dispatch(addOperativeFailure(message));
        });
};
