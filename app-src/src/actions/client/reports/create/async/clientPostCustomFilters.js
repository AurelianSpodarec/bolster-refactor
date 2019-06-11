import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    CLIENT_POST_CUSTOM_FILTERS_REQUEST,
    CLIENT_POST_CUSTOM_FILTERS_SUCCESS,
    CLIENT_POST_CUSTOM_FILTERS_FAILURE
} from 'constants/client/actionTypes/clientReports';

export const clientPostCustomFiltersRequest = () => ({
    type: CLIENT_POST_CUSTOM_FILTERS_REQUEST
});

export const clientPostCustomFiltersSuccess = payload => ({
    type: CLIENT_POST_CUSTOM_FILTERS_SUCCESS,
    payload
});

export const clientPostCustomFiltersFailure = error => ({
    type: CLIENT_POST_CUSTOM_FILTERS_FAILURE,
    error
});

export default (companyID, postBody) => dispatch => {
    dispatch(clientPostCustomFiltersRequest());

    return axios
        .post(
            `${CLIENT_API_URL}/reports/${companyID}/filters`,
            postBody,
            getHeaders()
        )
        .then(res => dispatch(clientPostCustomFiltersSuccess(res.data)))
        .catch(err =>
            dispatch(handleErrors(clientPostCustomFiltersFailure)(err))
        );
};
