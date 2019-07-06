import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_COMPANY_OPERATIVES_REQUEST,
    FETCH_COMPANY_OPERATIVES_SUCCESS,
    FETCH_COMPANY_OPERATIVES_FAILURE
} from 'constants/actionTypes/operatives';
import { COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';

export const fetchCompanyUsersRequest = () => ({
    type: FETCH_COMPANY_OPERATIVES_REQUEST
});

export const fetchCompanyUsersSuccess = payload => ({
    type: FETCH_COMPANY_OPERATIVES_SUCCESS,
    payload
});

export const fetchCompanyUsersFailure = error => ({
    type: FETCH_COMPANY_OPERATIVES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCompanyUsersRequest());

    return axios
        .get(`${API_URL}/users`, getHeaders())
        .then(res => {
            const operatives = res.data.filter(
                user => user.type === COMPANY_USER_ROLE_TYPES.OPERATIVE
            );
            return dispatch(fetchCompanyUsersSuccess(operatives));
        })
        .catch(error => {
            dispatch(fetchCompanyUsersFailure(error.message));
        });
};
