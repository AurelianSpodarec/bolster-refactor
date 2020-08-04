import axios from 'axios';

import {
    ADD_DEMO_REQUEST_COMMENT_REQUEST,
    ADD_DEMO_REQUEST_COMMENT_SUCCESS,
    ADD_DEMO_REQUEST_COMMENT_FAILURE,
} from 'constants/actionTypes/demoRequests';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const addDemoRequestCommentRequest = () => ({
    type: ADD_DEMO_REQUEST_COMMENT_REQUEST,
});

export const addDemoRequestCommentSuccess = data => ({
    type: ADD_DEMO_REQUEST_COMMENT_SUCCESS,
    data,
});

export const addDemoRequestCommentFailure = error => ({
    type: ADD_DEMO_REQUEST_COMMENT_FAILURE,
    error,
});

export default (demoRequestID, comments) => dispatch => {
    dispatch(addDemoRequestCommentRequest());
    return axios
        .post(
            `${ADMIN_API_URL}/enquiries/demoRequest/${demoRequestID}`,
            { Comments: comments },
            getHeaders(),
        )
        .then(({ data }) => dispatch(addDemoRequestCommentSuccess(data)))
        .catch(err => dispatch(addDemoRequestCommentFailure(err.message)));
};
