import axios from 'axios';

import { getHeaders } from 'helpers/api';
import { FRONTEND_API_URL } from 'config';
import {
    FETCH_PINS_BY_SHARE_LINK_REQUEST,
    FETCH_PINS_BY_SHARE_LINK_SUCCESS,
    FETCH_PINS_BY_SHARE_LINK_FAILURE
} from 'constants/actionTypes/pins';

export const fetchPinsByShareLinkRequest = () => ({
    type: FETCH_PINS_BY_SHARE_LINK_REQUEST
});

export const fetchPinsByShareLinkSuccess = payload => ({
    type: FETCH_PINS_BY_SHARE_LINK_SUCCESS,
    payload
});

export const fetchPinsByShareLinkFailure = error => ({
    type: FETCH_PINS_BY_SHARE_LINK_FAILURE,
    error
});

export default shareKey => dispatch => {
    dispatch(fetchPinsByShareLinkRequest());

    axios
        .get(`${FRONTEND_API_URL}/pins/${shareKey}`, getHeaders())
        .then(res => dispatch(fetchPinsByShareLinkSuccess(res.data)))
        .catch(error => dispatch(fetchPinsByShareLinkFailure(error.message)));
};
