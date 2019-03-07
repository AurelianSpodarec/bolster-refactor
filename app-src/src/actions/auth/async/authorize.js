// import axios from 'axios';

import {
    AUTHORIZE_REQUEST,
    AUTHORIZE_SUCCESS,
    AUTHORIZE_FAILURE
} from 'constants/actionTypes/auth';

export const authorizeRequest = () => ({
    type: AUTHORIZE_REQUEST
});

export const authorizeSuccess = () => ({
    type: AUTHORIZE_SUCCESS
});

export const authorizeFailure = () => ({
    type: AUTHORIZE_FAILURE
});

export default () => dispatch => {
    dispatch(authorizeRequest());

    return new Promise((reslove, reject) => {
        const token = localStorage.getItem('token');
        token && token.length ? reslove() : reject();
    })
        .then(() => dispatch(authorizeSuccess()))
        .catch(() => dispatch(authorizeFailure()));
};
