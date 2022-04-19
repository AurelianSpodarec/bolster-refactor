import axios from 'axios';
import { API_URL } from 'config';
import {
    FETCH_ALL_PRELIMS_FAILURE,
    FETCH_ALL_PRELIMS_REQUEST,
    FETCH_ALL_PRELIMS_SUCCESS,
} from 'constants/actionTypes/prelims';
import { getHeaders } from 'helpers/api';

export const fetchAllPrelimsRequest = () => ({
    type: FETCH_ALL_PRELIMS_REQUEST,
});

export const fetchAllPrelimsSuccess = payload => ({
    type: FETCH_ALL_PRELIMS_SUCCESS,
    payload,
});

export const fetchAllPrelimsFailure = error => ({
    type: FETCH_ALL_PRELIMS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchAllPrelimsRequest());

    return axios
        .get(`${API_URL}/prelims`, getHeaders())
        .then(res => dispatch(fetchAllPrelimsSuccess(res.data)))
        .catch(err => dispatch(fetchAllPrelimsFailure(err.message)));
};
