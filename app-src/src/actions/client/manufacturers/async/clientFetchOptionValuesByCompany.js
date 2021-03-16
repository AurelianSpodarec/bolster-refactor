import axios from 'axios';

import {
    CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_REQUEST,
    CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_SUCCESS,
    CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_FAILURE,
} from 'constants/client/actionTypes/clientManufacturers';
import { CLIENT_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const clientfetchOptionValuesByCompanyRequest = () => ({
    type: CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_REQUEST,
});

export const clientfetchOptionValuesByCompanySuccess = payload => ({
    type: CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_SUCCESS,
    payload,
});

export const clientfetchOptionValuesByCompanyFailure = error => ({
    type: CLIENT_FETCH_OPTION_VALUES_BY_COMPANY_FAILURE,
    error,
});

export default companyID => dispatch => {
    dispatch(clientfetchOptionValuesByCompanyRequest());

    return axios
        .get(`${CLIENT_API_URL}/manufacturer/optionvalues/all/${companyID}`, getHeaders())
        .then(res => dispatch(clientfetchOptionValuesByCompanySuccess(res.data)))
        .catch(err => dispatch(clientfetchOptionValuesByCompanyFailure(err.message)));
};
