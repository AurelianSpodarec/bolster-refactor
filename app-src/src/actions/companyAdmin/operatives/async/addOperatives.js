import Axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    ADD_OPERATIVES_REQUEST,
    ADD_OPERATIVES_SUCCESS,
    ADD_OPERATIVES_FAILURE
} from 'constants/actionTypes/operatives';

export const addOperativesRequest = () => ({
    type: ADD_OPERATIVES_REQUEST
});

export const addOperativesSuccess = payload => ({
    type: ADD_OPERATIVES_SUCCESS,
    payload
});

export const addOperativesFailure = error => ({
    type: ADD_OPERATIVES_FAILURE,
    error
});

export default (HierarchyType, HierarchyID, postBody) => dispatch => {
    dispatch(addOperativesRequest());
    return Axios.post(
        `${API_URL}/operativepermissions/${HierarchyType}/${HierarchyID}/multiple`,
        postBody,
        getHeaders()
    )
        .then(({ data }) => dispatch(addOperativesSuccess(data)))
        .catch(({ response, message }) => {
            response && response.status === 400
                ? dispatch(setAPIFieldErrors(response.data.error))
                : dispatch(addOperativesFailure(message));
        });
};
