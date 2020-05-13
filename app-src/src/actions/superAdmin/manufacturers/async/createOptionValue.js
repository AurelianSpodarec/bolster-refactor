import axios from 'axios';
import {
    SA_CREATE_OPTION_VALUE_REQUEST,
    SA_CREATE_OPTION_VALUE_SUCCESS,
    SA_CREATE_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/superAdminOptionValues';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const createOptionValueRequest = () => ({
    type: SA_CREATE_OPTION_VALUE_REQUEST,
});

export const createOptionValueSuccess = (payload, manufacturerID) => ({
    type: SA_CREATE_OPTION_VALUE_SUCCESS,
    payload,
    manufacturerID,
});

export const createOptionValueFailure = error => ({
    type: SA_CREATE_OPTION_VALUE_FAILURE,
    error,
});

export default (manufacturerID, postBody) => dispatch => {
    dispatch(createOptionValueRequest());
    return axios
        .post(
            `${ADMIN_API_URL}/manufacturer/${manufacturerID}/optionvalues`,
            postBody,
            getHeaders(),
        )
        .then(({ data }) => dispatch(createOptionValueSuccess(data, manufacturerID)))
        .catch(err => {
            dispatch(createOptionValueFailure(err.message));

            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
