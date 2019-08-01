import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_DRAWING_SHARE_LINKS_REQUEST,
    FETCH_DRAWING_SHARE_LINKS_SUCCESS,
    FETCH_DRAWING_SHARE_LINKS_FAILURE
} from 'constants/actionTypes/drawings';

export const fetchDrawingShareLinksRequest = () => ({
    type: FETCH_DRAWING_SHARE_LINKS_REQUEST
});

export const fetchDrawingShareLinksSuccess = payload => ({
    type: FETCH_DRAWING_SHARE_LINKS_SUCCESS,
    payload
});

export const fetchDrawingShareLinksFailure = error => ({
    type: FETCH_DRAWING_SHARE_LINKS_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchDrawingShareLinksRequest());

    return axios
        .get(`${API_URL}/drawings/${id}/sharelinks`, getHeaders())
        .then(({ data }) => dispatch(fetchDrawingShareLinksSuccess(data)))
        .catch(err => dispatch(fetchDrawingShareLinksFailure(err.message)));
};
