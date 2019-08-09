import axios from 'axios';

import {
    CREATE_DRAWING_SHARE_LINK_REQUEST,
    CREATE_DRAWING_SHARE_LINK_SUCCESS,
    CREATE_DRAWING_SHARE_LINK_FAILURE
} from 'constants/actionTypes/drawings';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const createDrawingShareLinkRequest = () => ({
    type: CREATE_DRAWING_SHARE_LINK_REQUEST
});

export const createDrawingShareLinkSuccess = payload => ({
    type: CREATE_DRAWING_SHARE_LINK_SUCCESS,
    payload
});

export const createDrawingShareLinkFailure = error => ({
    type: CREATE_DRAWING_SHARE_LINK_FAILURE,
    error
});

export default drawingID => dispatch => {
    dispatch(createDrawingShareLinkRequest());
    return axios
        .post(
            `${API_URL}/drawings/${drawingID}/sharelinks`,
            { startOn: new Date() },
            getHeaders()
        )
        .then(({ data }) => dispatch(createDrawingShareLinkSuccess(data)))
        .catch(err => dispatch(createDrawingShareLinkFailure(err.message)));
};
