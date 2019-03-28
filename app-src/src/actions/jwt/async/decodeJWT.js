import { getDecodedJWT } from 'helpers/api';

import {
    DECODE_JWT_REQUEST,
    DECODE_JWT_SUCCESS
} from 'constants/actionTypes/decodeJWT';

export const decodeJWTRequest = () => ({
    type: DECODE_JWT_REQUEST
});

export const decodeJWTSuccess = payload => ({
    type: DECODE_JWT_SUCCESS,
    payload
});

export default () => dispatch => {
    dispatch(decodeJWTRequest());

    getDecodedJWT().then(data => dispatch(decodeJWTSuccess(data)));
};
