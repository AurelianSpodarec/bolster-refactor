import axios from 'axios';

import { API_URL } from 'config/index';
import {
    DELETE_PRELIM_LINK_FAILURE,
    DELETE_PRELIM_LINK_REQUEST,
    DELETE_PRELIM_LINK_SUCCESS,
} from 'constants/actionTypes/prelims';
import { getHeaders } from 'helpers/api';

export const deletePrelimLinkRequest = () => ({
    type: DELETE_PRELIM_LINK_REQUEST,
});

export const deletePrelimLinkSuccess = id => ({
    type: DELETE_PRELIM_LINK_SUCCESS,
    id,
});

export const deletePrelimLinkFailure = error => ({
    type: DELETE_PRELIM_LINK_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deletePrelimLinkRequest());

    return axios
        .delete(`${API_URL}/prelims/${id}`, getHeaders())
        .then(() => dispatch(deletePrelimLinkSuccess(id)))
        .catch(error => dispatch(deletePrelimLinkFailure(error)));
};
