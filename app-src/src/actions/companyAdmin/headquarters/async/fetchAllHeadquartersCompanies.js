import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_ALL_HEADQUARTERS_COMPANIES_REQUEST,
    FETCH_ALL_HEADQUARTERS_COMPANIES_SUCCESS,
    FETCH_ALL_HEADQUARTERS_COMPANIES_FAILURE
} from 'constants/actionTypes/headquarters';
import { getHeaders } from 'helpers/api';

export const fetchAllHeadquartersCompaniesRequest = () => ({
    type: FETCH_ALL_HEADQUARTERS_COMPANIES_REQUEST
});

export const fetchAllHeadquartersCompaniesSuccess = payload => ({
    type: FETCH_ALL_HEADQUARTERS_COMPANIES_SUCCESS,
    payload
});

export const fetchAllHeadquartersCompaniesFailure = error => ({
    type: FETCH_ALL_HEADQUARTERS_COMPANIES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllHeadquartersCompaniesRequest());

    return axios
        .get(`${API_URL}/headquarters/companies`, getHeaders())
        .then(({ data }) =>
            dispatch(fetchAllHeadquartersCompaniesSuccess(data))
        )
        .catch(err =>
            dispatch(fetchAllHeadquartersCompaniesFailure(err.message))
        );
};
