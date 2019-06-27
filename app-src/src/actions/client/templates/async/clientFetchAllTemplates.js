import axios from 'axios';

import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_ALL_TEMPLATES_REQUEST,
    CLIENT_FETCH_ALL_TEMPLATES_SUCCESS,
    CLIENT_FETCH_ALL_TEMPLATES_FAILURE
} from 'constants/client/actionTypes/clientTemplates';
import { CLIENT_API_URL } from 'config';

export const clientFetchAllTemplatesRequest = () => ({
    type: CLIENT_FETCH_ALL_TEMPLATES_REQUEST
});

export const clientFetchAllTemplatesSuccess = payload => ({
    type: CLIENT_FETCH_ALL_TEMPLATES_SUCCESS,
    payload
});

export const clientFetchAllTemplatesFailure = error => ({
    type: CLIENT_FETCH_ALL_TEMPLATES_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(clientFetchAllTemplatesRequest());

    return axios
        .get(`${CLIENT_API_URL}/templates/${companyID}`, getHeaders())
        .then(res => dispatch(clientFetchAllTemplatesSuccess(res.data)))
        .catch(err => dispatch(clientFetchAllTemplatesFailure(err.message)));
};
