import axios from 'axios';

import {
    DELETE_COMPANY_USER_REQUEST,
    DELETE_COMPANY_USER_SUCCESS,
    DELETE_COMPANY_USER_FAILURE,
} from 'constants/actionTypes/usersManagement';

import { API_URL } from 'config';
import { getDecodedJWT, getHeaders } from 'helpers/api';

export const deleteCompanyUserRequest = () => ({
    type: DELETE_COMPANY_USER_REQUEST,
});

export const deleteCompanyUserSuccess = user => ({
    type: DELETE_COMPANY_USER_SUCCESS,
    user,
});

export const deleteCompanyUserFailure = error => ({
    type: DELETE_COMPANY_USER_FAILURE,
    error,
});

export default (id, user) => async dispatch => {
    const token = await getDecodedJWT();

    axios
        .delete(`${API_URL}/users/${id}`, getHeaders())
        .then(() =>
            dispatch(
                deleteCompanyUserSuccess({
                    ...user,
                    endedOn: new Date(),
                    endedByCompanyUserID: token?.companyUserID,
                }),
            ),
        )
        .catch(err => dispatch(deleteCompanyUserFailure(err.message)));
};
