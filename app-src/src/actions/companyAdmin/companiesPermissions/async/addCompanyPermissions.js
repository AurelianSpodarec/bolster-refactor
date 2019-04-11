import Axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    ADD_COMPANY_PERMISSIONS_REQUEST,
    ADD_COMPANY_PERMISSIONS_SUCCESS,
    ADD_COMPANY_PERMISSIONS_FAILURE
} from 'constants/actionTypes/companiesWithPermissions';

export const addCompanyRequest = () => ({
    type: ADD_COMPANY_PERMISSIONS_REQUEST
});

export const addCompanySuccess = payload => ({
    type: ADD_COMPANY_PERMISSIONS_SUCCESS,
    payload
});

export const addCompanyFailure = error => ({
    type: ADD_COMPANY_PERMISSIONS_FAILURE,
    error
});

export default (HierarchyType, HierarchyID, postBody) => dispatch => {
    dispatch(addCompanyRequest());
    return Axios.post(
        `${API_URL}/companypermissions/${HierarchyType}/${HierarchyID}`,
        postBody,
        getHeaders()
    )
        .then(({ data }) => dispatch(addCompanySuccess(data)))
        .catch(({ response, message }) => {
            response.status === 400
                ? dispatch(setAPIFieldErrors(response.data.errors))
                : dispatch(addCompanyFailure(message));
        });
};
