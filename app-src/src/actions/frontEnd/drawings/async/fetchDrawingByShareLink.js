import axios from 'axios';

import { getHeaders } from 'helpers/api';
import { FRONTEND_API_URL } from 'config';
import {
    FETCH_DRAWING_BY_SHARE_LINK_REQUEST,
    FETCH_DRAWING_BY_SHARE_LINK_SUCCESS,
    FETCH_DRAWING_BY_SHARE_LINK_FAILURE
} from 'constants/actionTypes/drawings';

export const fetchDrawingByShareLinkRequest = () => ({
    type: FETCH_DRAWING_BY_SHARE_LINK_REQUEST
});

export const fetchDrawingByShareLinkSuccess = payload => ({
    type: FETCH_DRAWING_BY_SHARE_LINK_SUCCESS,
    payload
});

export const fetchDrawingByShareLinkFailure = error => ({
    type: FETCH_DRAWING_BY_SHARE_LINK_FAILURE,
    error
});

//HierarchyType = Site/Building/Floor/Drawing
export default shareKey => dispatch => {
    dispatch(fetchDrawingByShareLinkRequest());

    axios
        .get(`${FRONTEND_API_URL}/drawings/${shareKey}`, getHeaders())
        .then(res => dispatch(fetchDrawingByShareLinkSuccess(res.data)))
        .catch(error =>
            dispatch(fetchDrawingByShareLinkFailure(error.message))
        );
};
