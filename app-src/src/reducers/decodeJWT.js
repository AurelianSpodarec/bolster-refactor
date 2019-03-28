import { updateObj } from 'helpers/generic';

import {
    DECODE_JWT_REQUEST,
    DECODE_JWT_SUCCESS,
    DECODE_JWT_FAILURE
} from 'constants/actionTypes/decodeJWT';

const state = {
    isDecoding: false,
    account: {},
    error: null
};

export default function decodingJWTReducer(action) {
    switch (action.type) {
        case DECODE_JWT_REQUEST:
            return this.setState({
                isDecoding: true
            });
        case DECODE_JWT_SUCCESS:
            return this.setState({
                isDecoding: false,
                account: updateObj(action.payload)
            });
        case DECODE_JWT_FAILURE:
            return this.setState({
                isDecoding: false,
                error: action.error
            });
        default:
            return state;
    }
}
