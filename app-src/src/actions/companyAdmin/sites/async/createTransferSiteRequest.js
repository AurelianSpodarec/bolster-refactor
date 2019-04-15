import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_TRANSFER_SITE_REQUEST,
    CREATE_TRANSFER_SITE_SUCCESS,
    CREATE_TRANSFER_SITE_FAILURE
} from 'constants/actionTypes/sites';

export const createTransferSiteRequestRequest = () => ({
    type: CREATE_TRANSFER_SITE_REQUEST
});

export const createTransferSiteRequestSuccess = payload => ({
    type: CREATE_TRANSFER_SITE_SUCCESS,
    payload
});

export const createTransferSiteRequestFailure = error => ({
    type: CREATE_TRANSFER_SITE_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createTransferSiteRequestRequest());

    axios
        .post(`${API_URL}/transferrequests`, postBody, getHeaders())
        .then(({ data }) => dispatch(createTransferSiteRequestSuccess(data)))
        .catch(error => {
            dispatch(createTransferSiteRequestFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
