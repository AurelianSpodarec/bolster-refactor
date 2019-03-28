import { getDecodedJWT } from 'helpers/api';

import {
    DECODE_JWT_REQUEST,
    DECODE_JWT_SUCCESS,
    DECODE_JWT_FAILURE
} from 'constants/actionTypes/decodeJWT';

export const decodeJWTRequest = () => ({
    type: DECODE_JWT_REQUEST
});

export const decodeJWTSuccess = payload => ({
    type: DECODE_JWT_SUCCESS,
    payload
});

export const decodeJWTFailure = error => ({
    type: DECODE_JWT_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(decodeJWTRequest());

    getDecodedJWT()
        .then(res => dispatch(decodeJWTSuccess(res)))
        .catch(err => dispatch(decodeJWTFailure(err)));
};
