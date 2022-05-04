import axios from 'axios';

import {
    LINK_PRELIM_REQUEST,
    LINK_PRELIM_SUCCESS,
    LINK_PRELIM_FAILURE,
} from 'constants/actionTypes/prelims';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const linkPrelimRequest = () => ({
    type: LINK_PRELIM_REQUEST,
});

export const linkPrelimSuccess = payload => ({
    type: LINK_PRELIM_SUCCESS,
    payload,
});

export const linkPrelimFailure = error => ({
    type: LINK_PRELIM_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(linkPrelimRequest());

    return axios
        .post(`${API_URL}/costingandestimating/LinkPrelim`, postBody, getHeaders())
        .then(res => {
            dispatch(linkPrelimSuccess(res.data));
        })
        .catch(err => {
            dispatch(linkPrelimFailure(err.message));
        });
};
