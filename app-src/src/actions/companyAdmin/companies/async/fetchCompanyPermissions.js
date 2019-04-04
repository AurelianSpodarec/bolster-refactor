import axios from 'axios';

import {
    FETCH_COMPANY_PERMISSIONS_REQUEST,
    FETCH_COMPANY_PERMISSIONS_SUCCESS,
    FETCH_COMPANY_PERMISSIONS_FAILURE
} from 'constants/actionTypes/companies';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCompanyPermissionsRequest = () => ({
    type: FETCH_COMPANY_PERMISSIONS_REQUEST
});

export const fetchCompanyPermissionsSuccess = payload => ({
    type: FETCH_COMPANY_PERMISSIONS_SUCCESS,
    payload
});

export const fetchCompanyPermissionsFailure = error => ({
    type: FETCH_COMPANY_PERMISSIONS_FAILURE,
    error
});

export default (hierarchyType, hierarchyID) => dispatch => {
    dispatch(fetchCompanyPermissionsRequest());

    axios
        .get(
            `${API_URL}/permissions/company/${hierarchyType}/${hierarchyID}`,
            getHeaders()
        )
        .then(res => dispatch(fetchCompanyPermissionsSuccess(res.data)))
        .catch(err => dispatch(fetchCompanyPermissionsFailure(err.message)));
};
