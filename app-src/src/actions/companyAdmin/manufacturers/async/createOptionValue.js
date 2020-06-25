import axios from 'axios';
import {
    CREATE_OPTION_VALUE_REQUEST,
    CREATE_OPTION_VALUE_SUCCESS,
    CREATE_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const createOptionValueRequest = () => ({
    type: CREATE_OPTION_VALUE_REQUEST,
});

export const createOptionValueSuccess = (payload, manufacturerID) => ({
    type: CREATE_OPTION_VALUE_SUCCESS,
    payload,
    manufacturerID,
});

export const createOptionValueFailure = error => ({
    type: CREATE_OPTION_VALUE_FAILURE,
    error,
});

export default (manufacturerID, postBody) => dispatch => {
    dispatch(createOptionValueRequest());
    return axios
        .post(`${API_URL}/manufacturer/${manufacturerID}/optionvalues`, postBody, getHeaders())
        .then(({ data }) => dispatch(createOptionValueSuccess(data, manufacturerID)))
        .catch(err => {
            dispatch(createOptionValueFailure(err.message));

            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
