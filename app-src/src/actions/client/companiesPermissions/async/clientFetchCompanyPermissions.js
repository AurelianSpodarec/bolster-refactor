import axios from 'axios';

import {
    CLIENT_FETCH_COMPANY_PERMISSIONS_REQUEST,
    CLIENT_FETCH_COMPANY_PERMISSIONS_SUCCESS,
    CLIENT_FETCH_COMPANY_PERMISSIONS_FAILURE
} from 'constants/actionTypes/companiesWithPermissions';
import { CLIENT_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyPermissionsRequest = () => ({
    type: CLIENT_FETCH_COMPANY_PERMISSIONS_REQUEST
});

export const fetchCompanyPermissionsSuccess = payload => ({
    type: CLIENT_FETCH_COMPANY_PERMISSIONS_SUCCESS,
    payload
});

export const fetchCompanyPermissionsFailure = error => ({
    type: CLIENT_FETCH_COMPANY_PERMISSIONS_FAILURE,
    error
});

export default (id, hierarchyType, hierarchyID) => dispatch => {
    dispatch(fetchCompanyPermissionsRequest());
    return axios
        .get(
            `${CLIENT_API_URL}/companypermissions/${id}/${hierarchyType}/${hierarchyID}`,
            getHeaders()
        )
        .then(res => dispatch(fetchCompanyPermissionsSuccess(res.data)))
        .catch(err => dispatch(fetchCompanyPermissionsFailure(err.message)));
};
