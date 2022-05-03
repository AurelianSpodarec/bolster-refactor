import axios from 'axios';

import { API_URL } from 'config/index';
import {
    DELETE_LINK_PRELIM_FAILURE,
    DELETE_LINK_PRELIM_REQUEST,
    DELETE_LINK_PRELIM_SUCCESS,
} from 'constants/actionTypes/costingAndEstimating';
import { getHeaders } from 'helpers/api';

export const deleteLinkPrelimRequest = () => ({
    type: DELETE_LINK_PRELIM_REQUEST,
});

export const deleteLinkPrelimSuccess = id => ({
    type: DELETE_LINK_PRELIM_SUCCESS,
    id,
});

export const deleteLinkPrelimFailure = error => ({
    type: DELETE_LINK_PRELIM_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deleteLinkPrelimRequest());

    return axios
        .delete(`${API_URL}/prelims/${id}`, getHeaders())
        .then(() => dispatch(deleteLinkPrelimSuccess(id)))
        .catch(error => dispatch(deleteLinkPrelimFailure(error)));
};
