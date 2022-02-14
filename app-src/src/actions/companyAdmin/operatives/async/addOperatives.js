import Axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    ADD_OPERATIVES_REQUEST,
    ADD_OPERATIVES_SUCCESS,
    ADD_OPERATIVES_FAILURE,
} from 'constants/actionTypes/operatives';

export const addOperativesRequest = () => ({
    type: ADD_OPERATIVES_REQUEST,
});

export const addOperativesSuccess = payload => ({
    type: ADD_OPERATIVES_SUCCESS,
    payload,
});

export const addOperativesFailure = error => ({
    type: ADD_OPERATIVES_FAILURE,
    error,
});

export default (HierarchyType, HierarchyID, postBody) => dispatch => {
    dispatch(addOperativesRequest());
    return Axios.post(
        `${API_URL}/operativepermissions/${HierarchyType}/${HierarchyID}/multiple`,
        postBody,
        getHeaders(),
    )
        .then(({ data }) => dispatch(addOperativesSuccess(data)))
        .catch(err => dispatch(handleErrors(addOperativesFailure)(err)));
};
